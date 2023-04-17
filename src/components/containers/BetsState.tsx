import { createContainer } from "unstated-next"
import { GameState } from "./GameState"
import type { Bet, BetMetadata } from "../../interfaces/Bet"
import { useEffect, useState } from "react"
import { Auth } from "./Auth"
import { LobbyHeaderState } from "./LobbyHeaderState"
import { firebaseApp } from "../../../firestore.config"
import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  query,
  QuerySnapshot,
  Timestamp,
  where,
} from "firebase/firestore"
import { UserDataState } from "./UserDataState"

const db = getFirestore(firebaseApp)

const genericBet: Bet = {
  id: "",
  amount: 0,
  betSide: "black",
  multiplier: 0,
  status: "ready",
  user1Id: "",
  user1Metamask: "",
  user1PhotoURL: "",
  user1DisplayName: "",
  hasUser1Paid: false,
  user2Id: "",
  user2Metamask: "",
  user2PhotoURL: "",
  user2DisplayName: "",
  hasUser2Paid: false,
  createdAt: Timestamp.now(),
  gameId: "",
  timestamp: Timestamp.now(),
  contractAddress: "",
  user1FollowThrough: [],
  user2FollowThrough: [],
}

const useBetState = () => {
  const { gameId } = GameState.useContainer()
  const [bets, setBets] = useState<Bet[]>([])

  useEffect(() => {
    if (gameId === "") return
    const lobbyCollectionRef = collection(db, "lobby")
    const q = query(
      lobbyCollectionRef,
      where("gameId", "==", gameId),
      limit(30),
    )

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      const betsWithIds = snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Bet),
      )

      setBets(betsWithIds)
    })

    return () => {
      unsubscribe()
    }
  }, [gameId])

  const [selectedBetMap, setSelectedBetMap] = useState(
    new Map<string, BetMetadata>(),
  )

  const { mostRecentButton, isDescending, isRealtime } =
    LobbyHeaderState.useContainer()

  // This sorting mechanism is mostly for browser compatibility
  const determineSortOrder = (
    a: number | string | Date | Timestamp,
    b: number | string | Date | Timestamp,
  ): number => +(a > b) || -(a < b)

  const sortBasedOnDescending = (
    a: number | string | Date | Timestamp,
    b: number | string | Date | Timestamp,
  ): number =>
    isDescending ? determineSortOrder(a, b) : determineSortOrder(b, a)

  const sortBasedOnRecentButton = (
    a: Bet,
    b: Bet,
    mostRecentButton: string,
  ): number => {
    switch (mostRecentButton) {
      case "Side": {
        return sortBasedOnDescending(a.betSide, b.betSide)
      }
      case "Trust": {
        const bet1Trust = a.user1FollowThrough[0] / a.user1FollowThrough[1]
        const bet2Trust = b.user1FollowThrough[0] / b.user1FollowThrough[1]
        return sortBasedOnDescending(bet1Trust, bet2Trust)
      }
      case "Prize": {
        const bet1Prize = a.amount + a.amount * a.multiplier
        const bet2Prize = b.amount + b.amount * b.multiplier
        return sortBasedOnDescending(bet1Prize, bet2Prize)
      }
      case "Cost": {
        return sortBasedOnDescending(a.amount, b.amount)
      }
      case "Multiplier": {
        return sortBasedOnDescending(a.multiplier, b.multiplier)
      }
      case "Time":
      case "":
      default: {
        return sortBasedOnDescending(
          a?.createdAt?.toDate() ?? a?.timestamp?.toDate(),
          b?.createdAt?.toDate() ?? b?.timestamp?.toDate(),
        )
      }
    }
  }

  const { user, isLoading } = Auth.useContainer()
  const { userData } = UserDataState.useContainer()

  const [realtimeBets, setRealtimeBets] = useState<Bet[]>([])
  const [refreshingBets, setRefreshingBets] = useState<Bet[]>([])

  const updateLobby = async (bets: Bet[]) => {
    const buildNotSelectedBets = async (bets: Bet[]): Promise<Bet[]> => {
      const filterIrrelevantBets = (bet: Bet): boolean =>
        bet.status !== "funded" &&
        bet.user1Id !== user?.uid &&
        bet.gameId !== "" &&
        (!userData?.blockedUsers.includes(bet.user1Id) ?? true) &&
        (!userData?.blockedUsers.includes(bet.user2Id) ?? true) &&
        !selectedBetMap.get(bet.id)?.isSelected
      return (
        bets
          ?.filter(filterIrrelevantBets)
          .sort((a, b) => sortBasedOnRecentButton(b, a, mostRecentButton)) ?? []
      )
    }

    const buildSelecteBets = async (bets: Bet[]): Promise<Bet[]> => {
      return (
        bets
          ?.filter((bet) => selectedBetMap.get(bet.id))
          .sort((a, b) =>
            determineSortOrder(
              selectedBetMap.get(b.id)?.index!,
              selectedBetMap.get(a.id)?.index!,
            ),
          ) ?? []
      )
    }

    const buildSelectedBetIndicies = async (
      selectedBets: Bet[],
    ): Promise<(number | undefined)[]> => {
      return (
        selectedBets
          .map((bet) => selectedBetMap.get(bet.id)!.index)
          .sort((a, b) => determineSortOrder(b, a)) ?? []
      )
    }

    const buildBetStacks = async (bets: Bet[]) => {
      const notSelected = buildNotSelectedBets(bets)
      const selectedBets = await buildSelecteBets(bets)
      const selectedIndicies = buildSelectedBetIndicies(selectedBets)
      const [notSelectedBets, selectedBetIndicies] = await Promise.all([
        notSelected,
        selectedIndicies,
      ])
      return { notSelectedBets, selectedBetIndicies, selectedBets }
    }

    const weaveBets = (
      notSelectedBets: Bet[],
      selectedBetIndicies: (number | undefined)[],
      selectedBets: Bet[],
    ): Bet[] => {
      let out: Bet[] = []
      const selectedLength = selectedBets?.length ?? 0
      const notSelectedLength = notSelectedBets?.length ?? 0
      const maxPossLength = Math.max(
        (selectedBetIndicies[0] ?? -1) + 1,
        selectedLength + notSelectedLength,
      )
      let selectedBetIndex = selectedBetIndicies.pop()
      while (out.length < maxPossLength) {
        if (out.length === selectedBetIndex) {
          out = [...out, selectedBets?.pop() ?? genericBet]
          selectedBetIndex = selectedBetIndicies.pop()
        } else {
          out = [...out, notSelectedBets?.pop() ?? genericBet]
        }
      }
      return out
    }

    const { notSelectedBets, selectedBetIndicies, selectedBets } =
      await buildBetStacks(bets ?? [])
    return weaveBets(notSelectedBets, selectedBetIndicies, selectedBets)
  }

  const updateRealTimeBets = async () => {
    if (!isLoading) setRealtimeBets(await updateLobby(bets ?? []))
  }

  const updateRefreshingBets = async () => {
    if (!isLoading) setRefreshingBets(await updateLobby(bets ?? []))
  }

  const clearMapForLobbyChange = () => {
    setSelectedBetMap(new Map())
  }

  useEffect(() => {
    clearMapForLobbyChange()
  }, [gameId, user, isRealtime])

  const [showWagerForm, setShowWagerForm] = useState(false)

  const betsPlacedByUser =
    bets
      ?.filter(
        (bet: Bet) =>
          bet.user1Id === user?.uid &&
          bet.gameId !== "" &&
          bet.status !== "funded",
      )
      .sort((a, b) =>
        determineSortOrder(
          a?.localCreatedAt?.toDate(),
          b?.localCreatedAt?.toDate(),
        ),
      ) ?? []

  return {
    bets,
    selectedBetMap,
    setSelectedBetMap,
    realtimeBets,
    refreshingBets,
    setRefreshingBets,
    updateRealTimeBets,
    updateRefreshingBets,
    showWagerForm,
    setShowWagerForm,
    betsPlacedByUser,
  }
}
export const BetsState = createContainer(useBetState)
