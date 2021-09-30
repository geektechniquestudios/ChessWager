import React from "react"

import "../../config"

import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import Bet from "./Bet"

import WagerForm from "./WagerForm"
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types"
import { FirebaseError } from "@firebase/util"

const firestore = firebase.firestore() //@todo move into parent, use redux

interface Props {
  user: firebase.User | null | undefined
  auth: firebase.auth.Auth
}

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


const BettingLobby: React.FC<Props> = ({ user, auth }) => {
  const lobbyRef = firestore.collection("lobby")
  const query = lobbyRef.where("status", "!=", "complete") //.where("status", "==", "ready") //.orderBy("createdAt", "desc").limit(10) //.where("status", "==", "active")

  const [lobby]: [Lobby[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })

  return (
    <div className="lobby">
      <header>
        {/* @todo! add column names allowing sorting */}
        {/* @todo make css grid to bottom of container, consider putting at the top so new bets cascade downwards */}
        <WagerForm lobbyRef={lobbyRef} auth={auth} />
      </header>
      <main>
        <div className="lobby-container">
          {lobby &&
            lobby
              .filter(i => i.status === "ready")
              .map(bet => (
                <Bet
                  user={user}
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
                  auth={auth}
                />
              ))}
          {lobby &&
            lobby
              .filter(i => i.status === "pending")
              .map(bet => (
                <Bet
                  user={user}
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
                  auth={auth}
                />
              ))}
        </div>
      </main>
      <footer></footer>
    </div>
  )
}

export default BettingLobby
