import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Bet } from "./bet/Bet"

import { WagerForm } from "./wager-form/WagerForm"
import { FirebaseError } from "@firebase/util"
import { GameState } from "../containers/GameState"
import { Auth } from "../containers/Auth"
import { LobbyHeader } from "./lobby-header/LobbyHeader"
import { LobbyHeaderState } from "./lobby-header/LobbyHeaderState"
import { useEffect, useState } from "react"
import { LobbyState } from "../containers/LobbyState"

const firestore = firebase.firestore()

interface Bet {
  id: string
  amount: number
  betSide: "black" | "white"
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user1DisplayName: string
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  user2DisplayName: string
  hasUser2Paid: boolean
  createdAt: Date
  gameId: string
  timestamp: firebase.firestore.Timestamp
  contractAddress: string
  user1FollowThrough: number[]
  user2FollowThrough: number[]
}

interface BetData {
  isSelected: boolean
  index: number
  id: string
}

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

export const BettingLobby: React.FC = () => {
  const { user } = Auth.useContainer()
  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()
  const { gameId } = GameState.useContainer()
  const [selectedBetMap, setSelectedBetMap] = useState(
    new Map<string, BetData>(),
  )

  const lobbyCollectionRef = firestore.collection("lobby")
  const query = lobbyCollectionRef.where("gameId", "==", gameId)
  const [bets]: [Bet[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })

  const [interactableLobby, setInteractableLobby] = useState<Bet[] | undefined>(
    bets,
  )

  // This is here to satisfy browser compatibility; I know it seems odd
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

  const [isLobbyUpdating, setIsLobbyUpdating] = useState(false)
  const updateLobby = () => {
    const tempGameId = gameId
    if (isLobbyUpdating) return
    console.log("updating lobby")
    setIsLobbyUpdating(true)
    const tempSelectedBetMap = selectedBetMap
    const tempBets = bets

    const buildNotSelectedBets = () => {
      const filterOutSelected = (bet: Bet): boolean =>
        !tempSelectedBetMap.get(bet.id)?.isSelected
      const filterOutFundedAndUserRelated = (bet: Bet): boolean => {
        return (
          bet.status !== "funded" &&
          bet.user1Id !== user?.uid &&
          bet.gameId !== ""
        )
      }
      return tempBets
        ?.filter(filterOutFundedAndUserRelated)
        .filter(filterOutSelected)
        .sort(sortBasedOnRecentButton)
        .reverse()
    }
    const notSelectedBets = buildNotSelectedBets()

    const selectedBets =
      tempBets
        ?.filter((bet) => tempSelectedBetMap.get(bet.id)?.isSelected)
        .sort((a, b) =>
          determineSortOrder(
            tempSelectedBetMap.get(b.id)?.index ?? 0,
            tempSelectedBetMap.get(a.id)?.index ?? 0,
          ),
        ) ?? []

    const selectedBetIndicies =
      [...tempSelectedBetMap.keys()]
        .filter((key) => tempSelectedBetMap.get(key)?.isSelected)
        .map((key) => tempSelectedBetMap.get(key)!.index)
        .sort((a, b) => determineSortOrder(b, a)) ?? []

    const weaveBets = (): Bet[] => {
      let out: Bet[] = []
      let selectedBetIndex = selectedBetIndicies.pop()
      const selectedLength = selectedBets?.length ?? 0
      const notSelectedLength = notSelectedBets?.length ?? 0
      while (
        out.length <
        Math.max(selectedBetIndicies[0] ?? 0, selectedLength) +
          notSelectedLength
      ) {
        if (out.length === selectedBetIndex) {
          out = [...out, selectedBets?.pop() ?? genericBet]
          selectedBetIndex = selectedBetIndicies.pop()
        } else {
          out = [...out, notSelectedBets?.pop() ?? genericBet]
        }
      }
      return out
    }
    gameId === tempGameId
      ? setInteractableLobby(weaveBets())
      : setInteractableLobby([])
    setIsLobbyUpdating(false)
  }

  const [isLobbyEnabled, setIsLobbyEnabled] = useState(true)

  const { dummy, refreshLobby } = LobbyState.useContainer()
  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  const heartBeat = async () => {
    console.log("heartbeat")
    setIsLobbyEnabled(false)
    await delay(1000)
    updateLobby()
    setIsLobbyEnabled(true)
    setCount(5)
  }

  const [count, setCount] = useState(5)

  const [isCounting, setIsCounting] = useState(false)
  const heartBeatCountdown = () => {
    if (isCounting) return
    setIsCounting(true)
    console.log("countdown effect " + count)
    const timeout = setTimeout(() => {
      count > 0 ? setCount(count - 1) : heartBeat()
    }, 1000)
    setIsCounting(false)
    return () => clearTimeout(timeout)
  }
  useEffect(heartBeatCountdown, [count])

  useEffect(() => {
    console.log("button clicked")
    updateLobby()
    setIsLobbyEnabled(true)
    setCount(5)
  }, [mostRecentButton, isDescending, user, dummy])

  useEffect(() => {
    console.log("new game, clearing old data")
    setSelectedBetMap(new Map())
    setInteractableLobby([])
    setIsLobbyEnabled(true)
    setCount(5)
  }, [gameId])

  return (
    <div className="flex border-t border-stone-400 dark:border-stone-900">
      <WagerForm />
      <main className="w-full">
        <div className="overflow-y-hidden">
          <LobbyHeader />
          <div className="overflow-y-hidden h-full overflow-x-auto">
            {user &&
              bets
                ?.filter(
                  (bet) =>
                    bet.user1Id === user.uid &&
                    bet.gameId !== "" &&
                    bet.status !== "funded",
                )
                .map((bet, index) => (
                  <Bet
                    key={index}
                    {...bet}
                    timestamp={bet.timestamp?.seconds}
                    selectedBetMap={selectedBetMap}
                    setSelectedBetMap={setSelectedBetMap}
                  />
                ))}
            {interactableLobby?.map((bet, index) => (
              <Bet
                key={index}
                {...bet}
                timestamp={bet.timestamp?.seconds}
                selectedBetMap={selectedBetMap}
                setSelectedBetMap={setSelectedBetMap}
                index={index}
                isLobbyEnabled={isLobbyEnabled}
              />
            ))}
            {/* {bets?.filter(
              (bet) =>
                //if bet is in either of the other 2 lobby lists
                !(
                  bets
                    ?.filter(
                      (bet) =>
                        bet.user1Id === user?.uid
                    )
                    .includes(bet) || interactableLobby?.includes(bet)
                ),
            )} */}
          </div>
        </div>
      </main>
    </div>
  )
}
