import React from "react"

import "../../config"

import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import Bet from "./Bet"

import WagerForm from "./WagerForm"
import { FirebaseError } from "@firebase/util"
import { GameId } from "../containers/GameId"
import { Auth } from "../containers/Auth"

const firestore = firebase.firestore() //@todo move into parent, use redux

interface Lobby {
  id: string
  amount: number
  betSide: string
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  createdAt: Date
  gameId: string
}

const BettingLobby: React.FC = () => {
  const { user, auth } = Auth.useContainer()
  const gameIdContainer = GameId.useContainer()

  const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby")
  const query = lobbyRef
    .where("gameId", "==", gameIdContainer.gameId)
    // .orderBy("createdAt", "desc")

  const [lobby]: [Lobby[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })
    

  return (
    <div className="lobby">
      <header>
        {/* @todo! add column names allowing sorting */}
        <WagerForm lobbyRef={lobbyRef} auth={auth} />
      </header>
      <main>
        <div className="lobby-container">
          {/* get related-to-user games */}
          {lobby &&
            user &&
            lobby
              .filter(
                bet => bet.user1Id === user.uid || bet.user2Id === user.uid
              )
              .map(bet => (
                <Bet
                  className="in-progress-bet"
                  lobbyRef={lobbyRef}
                  key={bet.id}
                  id={bet.id}
                  amount={bet.amount}
                  betSide={bet.betSide}
                  multiplier={bet.multiplier}
                  status={bet.status}
                  user1Id={bet.user1Id}
                  user1Metamask={bet.user1Metamask}
                  user1PhotoURL={bet.user1PhotoURL}
                  user2Id={bet.user2Id}
                  user2Metamask={bet.user2Metamask}
                  user2PhotoURL={bet.user2PhotoURL}
                  createdAt={bet.createdAt}
                  gameId={bet.gameId}
                />
              ))}
          {lobby &&
            lobby
              .filter(
                bet =>
                  bet.status === "ready" &&
                  bet.user1Id !== user?.uid &&
                  bet.user2Id !== user?.uid
              )
              .map(bet => (
                <Bet
                  className="ready-bet"
                  lobbyRef={lobbyRef}
                  key={bet.id}
                  id={bet.id}
                  amount={bet.amount}
                  betSide={bet.betSide}
                  multiplier={bet.multiplier}
                  status={bet.status}
                  user1Id={bet.user1Id}
                  user1Metamask={bet.user1Metamask}
                  user1PhotoURL={bet.user1PhotoURL}
                  user2Id={bet.user2Id}
                  user2Metamask={bet.user2Metamask}
                  user2PhotoURL={bet.user2PhotoURL}
                  createdAt={bet.createdAt}
                  gameId={bet.gameId}
                />
              ))}
          {lobby &&
            lobby
              .filter(
                bet =>
                  bet.status === "pending" &&
                  bet.user1Id !== user?.uid &&
                  bet.user2Id !== user?.uid
              )
              .map(bet => (
                <Bet
                  className="pending-bet"
                  lobbyRef={lobbyRef}
                  key={bet.id}
                  id={bet.id}
                  amount={bet.amount}
                  betSide={bet.betSide}
                  multiplier={bet.multiplier}
                  status={bet.status}
                  user1Id={bet.user1Id}
                  user1Metamask={bet.user1Metamask}
                  user1PhotoURL={bet.user1PhotoURL}
                  user2Id={bet.user2Id}
                  user2Metamask={bet.user2Metamask}
                  user2PhotoURL={bet.user2PhotoURL}
                  createdAt={bet.createdAt}
                  gameId={bet.gameId}
                />
              ))}
        </div>
      </main>
      <footer></footer>
    </div>
  )
}

export default BettingLobby
