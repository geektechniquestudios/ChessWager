import firebase from "firebase/compat/app"
import { createContainer } from "unstated-next"
import { GameState } from "./GameState"
import { Bet, BetData } from "../../interfaces/Bet"
import { FirebaseError } from "@firebase/util"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useState } from "react"
import { Auth } from "./Auth"
import { LobbyHeaderState } from "../lobby/lobby-header/LobbyHeaderState"

const firestore = firebase.firestore()

const genericBet: Bet = {
  id: "",
  amount: 0,
  betSide: "black",
  multiplier: 0,
  status: "",
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
  createdAt: new Date(),
  gameId: "",
  timestamp: firebase.firestore.Timestamp.now(),
  contractAddress: "",
  user1FollowThrough: [],
  user2FollowThrough: [],
}

const useBetState = () => {
  const { gameId } = GameState.useContainer()
  const lobbyCollectionRef = firestore.collection("lobby")
  const query = lobbyCollectionRef.where("gameId", "==", gameId)
  const [bets, isLoading]: [
    Bet[] | undefined,
    boolean,
    FirebaseError | undefined,
  ] = useCollectionData(query, { idField: "id" }) ?? []
  const [selectedBetMap, setSelectedBetMap] = useState(
    new Map<string, BetData>(),
  )

  // This is for browser compatibility
  const determineSortOrder = (
    a: number | string | Date,
    b: number | string | Date,
  ): number => {
    return +(a > b) || -(a < b)
  }

  const sortBasedOnDescending = (
    a: number | string | Date,
    b: number | string | Date,
  ): number => {
    return isDescending ? determineSortOrder(a, b) : determineSortOrder(b, a)
  }

  const sortBasedOnRecentButton = (a: Bet, b: Bet): number => {
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
      case "Time": {
        return sortBasedOnDescending(a.createdAt, b.createdAt)
      }
      case "": {
        return 0
      }
      default: {
        return 0
      }
    }
  }
  const { user } = Auth.useContainer()
  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()
  const [realTimeBets, setRealTimeBets] = useState<Bet[]>([])
  const [refreshingBets, setRefreshingBets] = useState<Bet[]>([])

  const updateLobby = async (bets: Bet[]) => {
    const buildNotSelectedBets = async (bets: Bet[]): Promise<Bet[]> => {
      const filterOutFundedAndUserRelatedandSelected = (bet: Bet): boolean =>
        bet.status !== "funded" &&
        bet.user1Id !== user?.uid &&
        bet.gameId !== "" &&
        !selectedBetMap.get(bet.id)?.isSelected
      return (
        bets
          ?.filter(filterOutFundedAndUserRelatedandSelected)
          .sort((a, b) => sortBasedOnRecentButton(b, a)) ?? []
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
          .map((bet) => selectedBetMap.get(bet.id)?.index)
          .sort((a, b) => determineSortOrder(b ?? 0, a ?? 0)) ?? []
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
    setRealTimeBets(await updateLobby(bets ?? []))
  }

  const updateRefreshingBets = async () => {
    setRefreshingBets(await updateLobby(bets ?? []))
  }

  const clearMapForLobbyChange = () => () => {
    if (!isLoading) setSelectedBetMap(new Map())
  }

  return {
    bets,
    selectedBetMap,
    setSelectedBetMap,
    clearMapForLobbyChange,
    isLoading,
    realTimeBets,
    refreshingBets,
    setRefreshingBets,
    updateRealTimeBets,
    updateRefreshingBets,
  }
}
export const BetsState = createContainer(useBetState)