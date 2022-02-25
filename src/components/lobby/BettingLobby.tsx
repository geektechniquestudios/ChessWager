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
  betSide: string
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
  const [lobby]: [Bet[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })

  // const [interactableLobby, setInteractableLobby] = useState(
  //   lobby?.filter(
  //     (bet) =>
  //       bet.status !== "funded" &&
  //       bet.user1Id !== user?.uid &&
  //       bet.gameId !== "",
  //   ),
  // )

  // useEffect(() => {
  //   const updateLobby = () => {
  //     setInteractableLobby(
  //       lobby
  //         ?.filter(
  //           (bet) =>
  //             bet.status !== "funded" &&
  //             bet.user1Id !== user?.uid &&
  //             bet.gameId !== "",
  //         )
  //         .sort(),
  //     )
  //   }

  //   const interval = setInterval(updateLobby, 5000)
  //   // sort based on most recent button clicked and isdescending

  //   let sortingFunction: any

  //   switch (mostRecentButton) {
  //     case "Side": {
  //       sortingFunction = (a: Bet, b: Bet) => {
  //         if (a.betSide === b.betSide) return 0
  //         if (a.betSide === "white") return isDescending ? 1 : -1
  //         if (a.betSide === "black") return isDescending ? -1 : 1
  //       }
  //     }
  //     case "Trust": {
  //     }
  //     case "Prize": {
  //     }
  //     case "Cost": {
  //     }
  //     case "Multiplier": {
  //     }
  //     case "Time": {
  //     }
  //   }
    // switch statement including side, trust, prize, cost, multiplier, and age
    // "selected" bets should keep index in the array
  //   return () => clearInterval(interval)
  // }, [mostRecentButton, isDescending, lobby, user])

  return (
    <div className="flex border-t border-stone-400 dark:border-stone-900">
      <WagerForm />
      <main className="w-full">
        <div className="overflow-y-hidden">
          <LobbyHeader />
          <div className=" overflow-y-hidden h-full overflow-x-auto">
            {user &&
              lobby
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
                  />
                ))}
            {lobby
              ?.filter(
                (bet) =>
                  // bet.status === "ready" &&
                  bet.user1Id !== user?.uid &&
                  // bet.user2Id !== user?.uid &&
                  bet.gameId !== "",
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
              ))}
            {/* add lobby here that is new bets not updated to the interactable lobby yet */}
          </div>
        </div>
      </main>
    </div>
  )
}
