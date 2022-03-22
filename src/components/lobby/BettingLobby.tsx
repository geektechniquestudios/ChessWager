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
import { CreatedByUserBets } from "./CreatedByUserBets"
import { RefreshingBets } from "./RefreshingBets"
import { RealtimeBets } from "./RealtimeBets"

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
  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()
  const { gameId } = GameState.useContainer()
  const [selectedBetMap, setSelectedBetMap] = useState(
    new Map<string, BetData>(),
  )

  const lobbyCollectionRef = firestore.collection("lobby")
  const query = lobbyCollectionRef.where("gameId", "==", gameId)
  const [bets]: [Bet[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" }) ?? []

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

  const { isRealTime } = LobbyHeaderState.useContainer()
  return (
    <div className="flex border-t border-stone-400 dark:border-stone-900">
      <WagerForm />
      <main className="w-full">
        <div className="overflow-y-hidden">
          <LobbyHeader />
          <div className="overflow-y-hidden h-full overflow-x-auto">
            <CreatedByUserBets
              bets={bets ?? []}
              selectedBetMap={selectedBetMap}
              setSelectedBetMap={setSelectedBetMap}
            />
            {isRealTime ? (
              <RealtimeBets
                bets={bets ?? []}
                selectedBetMap={selectedBetMap}
                setSelectedBetMap={setSelectedBetMap}
                determineSortOrder={determineSortOrder}
                sortBasedOnRecentButton={sortBasedOnRecentButton}
                genericBet={genericBet}
              />
            ) : (
              <RefreshingBets
                bets={bets ?? []}
                selectedBetMap={selectedBetMap}
                setSelectedBetMap={setSelectedBetMap}
                determineSortOrder={determineSortOrder}
                sortBasedOnRecentButton={sortBasedOnRecentButton}
                genericBet={genericBet}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
