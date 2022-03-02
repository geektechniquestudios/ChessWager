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

export const BettingLobby: React.FC = () => {
  const { user } = Auth.useContainer()
  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()
  const { gameId } = GameState.useContainer()

  const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby")
  const query = lobbyRef.where("gameId", "==", gameId)
  const [bets]: [Bet[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })

  const [interactableLobby, setInteractableLobby] = useState(
    bets?.filter(
      (bet) =>
        bet.status !== "funded" &&
        bet.user1Id !== user?.uid &&
        bet.gameId !== "",
    ),
  )

  const determineSortOrder = (
    a: number | string | Date,
    b: number | string | Date,
  ): 1 | 0 | -1 | number => {
    return +(a > b) || -(a < b)
  }

  const sortBasedOnDescending = (
    a: number | string | Date,
    b: number | string | Date,
  ): 0 | 1 | -1 | number => {
    return isDescending ? determineSortOrder(a, b) : determineSortOrder(b, a)
  }

  const sortingFunction = (a: Bet, b: Bet): 0 | 1 | -1 | number => {
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

  const updateLobby = () => {
    // Object.keys(selectedBetMap).forEach(console.log)
    // console.log("updating lobby")
    setInteractableLobby(
      bets
        ?.filter(
          (bet) =>
            bet.status !== "funded" &&
            bet.user1Id !== user?.uid &&
            bet.gameId !== "",
        )
        .sort((a: Bet, b: Bet) => {
          return sortingFunction(a, b)
        }),
    )
  }

  const [selectedBetMap, setSelectedBetMap] = useState<Record<string, boolean>>(
    { testing: true },
  )

  useEffect(() => {
    updateLobby()
    const interval = setInterval(updateLobby, 5000)
    return () => clearInterval(interval)
  }, [mostRecentButton, isDescending, bets, user, gameId])

  return (
    <div className="flex border-t border-stone-400 dark:border-stone-900">
      <WagerForm />
      <main className="w-full">
        <div className="overflow-y-hidden">
          <LobbyHeader />
          <div className=" overflow-y-hidden h-full overflow-x-auto">
            {user &&
              bets
                ?.filter(
                  (bet) =>
                    bet.user1Id === user.uid &&
                    bet.gameId !== "" &&
                    bet.status !== "funded",
                )
                .map((bet) => (
                  <Bet
                    key={bet.id}
                    id={bet.id}
                    amount={bet.amount}
                    betSide={bet.betSide}
                    multiplier={bet.multiplier}
                    status={bet.status}
                    user1Id={bet.user1Id}
                    user1Metamask={bet.user1Metamask}
                    user1PhotoURL={bet.user1PhotoURL}
                    user1DisplayName={bet.user1DisplayName}
                    hasUser1Paid={bet.hasUser1Paid}
                    user2Id={bet.user2Id}
                    user2Metamask={bet.user2Metamask}
                    user2PhotoURL={bet.user2PhotoURL}
                    user2DisplayName={bet.user2DisplayName}
                    hasUser2Paid={bet.hasUser2Paid}
                    gameId={bet.gameId}
                    timestamp={bet.timestamp?.seconds}
                    contractAddress={bet.contractAddress}
                    user1FollowThrough={bet.user1FollowThrough}
                    user2FollowThrough={bet.user2FollowThrough}
                    selectedBetMap={selectedBetMap}
                    setSelectedBetMap={setSelectedBetMap}
                  />
                ))}
            {interactableLobby?.map((bet) => (
              <Bet
                key={bet.id}
                id={bet.id}
                amount={bet.amount}
                betSide={bet.betSide}
                multiplier={bet.multiplier}
                status={bet.status}
                user1Id={bet.user1Id}
                user1Metamask={bet.user1Metamask}
                user1PhotoURL={bet.user1PhotoURL}
                user1DisplayName={bet.user1DisplayName}
                hasUser1Paid={bet.hasUser1Paid}
                user2Id={bet.user2Id}
                user2Metamask={bet.user2Metamask}
                user2PhotoURL={bet.user2PhotoURL}
                user2DisplayName={bet.user2DisplayName}
                hasUser2Paid={bet.hasUser2Paid}
                gameId={bet.gameId}
                timestamp={bet.timestamp?.seconds}
                contractAddress={bet.contractAddress}
                user1FollowThrough={bet.user1FollowThrough}
                user2FollowThrough={bet.user2FollowThrough}
                selectedBetMap={selectedBetMap}
                setSelectedBetMap={setSelectedBetMap}
              />
            ))}
            {/* add lobby here that is new bets not updated to the interactable lobby yet */}
            {/* {lobby
              ?.filter(
                (bet) =>
                  //remove bets that have already appeared and are funded
              )
              // // sort
              ?.map((bet) => (
                <Bet
                  key={bet.id}
                  id={bet.id}
                  amount={bet.amount}
                  betSide={bet.betSide}
                  multiplier={bet.multiplier}
                  status={bet.status}
                  user1Id={bet.user1Id}
                  user1Metamask={bet.user1Metamask}
                  user1PhotoURL={bet.user1PhotoURL}
                  user1DisplayName={bet.user1DisplayName}
                  hasUser1Paid={bet.hasUser1Paid}
                  user2Id={bet.user2Id}
                  user2Metamask={bet.user2Metamask}
                  user2PhotoURL={bet.user2PhotoURL}
                  user2DisplayName={bet.user2DisplayName}
                  hasUser2Paid={bet.hasUser2Paid}
                  gameId={bet.gameId}
                  timestamp={bet.timestamp?.seconds}
                  contractAddress={bet.contractAddress}
                  user1FollowThrough={bet.user1FollowThrough}
                  user2FollowThrough={bet.user2FollowThrough}
                />
              ))} */}
          </div>
        </div>
      </main>
    </div>
  )
}
