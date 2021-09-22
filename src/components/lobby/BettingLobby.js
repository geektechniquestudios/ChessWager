import React, { useState } from "react"

import "../../config"

import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import Bet from "./Bet"

import WagerForm from "./WagerForm"

const firestore = firebase.firestore()

const BettingLobby = ({ auth }) => {
  const lobbyRef = firestore.collection("lobby")
  const query = lobbyRef.orderBy("createdAt", "desc").limit(10)

  const [lobby] = useCollectionData(query, { idField: "id" })



  return (
    <div>
      <header>
        {/* @todo! add column names allowing sorting */}
        {/* @todo make css grid to bottom of container, consider putting at the top so new bets cascade downwards */}
        <WagerForm lobbyRef={lobbyRef} auth={auth}/> 
        {/* todo move createWager into wagerform */}
      </header>

      {lobby &&
        lobby.map(bet => (
          <Bet
            key={bet.id}
            id={bet.id}
            amount={bet.amount}
            betSide={bet.betSide}
            multiplier={bet.multiplier}
            status={bet.status}
            user1Id={bet.user1Id}
            user1Metamask={bet.user1Metamask}
            user2Id={bet.user2Id}
            user2Metamask={bet.user2Metamask}
            createdAt={bet.createdAt}
            gameId={bet.gameId}
            auth={auth}
          />
        ))}
      <footer></footer>
    </div>
  )
}

export default BettingLobby
