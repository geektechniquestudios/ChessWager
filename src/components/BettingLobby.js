import React from "react"

import "../config"

import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import Bet from "./Bet"

const firestore = firebase.firestore()

const BettingLobby = ({ auth }) => {
  const lobbyRef = firestore.collection("lobby")
  const query = lobbyRef.orderBy("createdAt", "desc").limit(10)
  const [lobby] = useCollectionData(query, {idField: "id" })



  const createWager = async () => {
    alert("hello from create wager")
    // const { uid, photoURL } = auth.currentUser
    // await lobbyRef.add({})
  }

  return (
    <div>
      {/* {lobby && lobby.map(bet => bet.amount)} */}
      {lobby && lobby.map(bet => 
        <Bet
          key={bet.id}
          id={bet.id}
          amount={bet.amount}
          isBetWhite={bet.isBetWhite}
          multiplier={bet.multiplier}
          status={bet.status}
          user1={bet.user1}
          user2={bet.user2}
          createdAt={bet.createdAt}
          createWager={createWager}
        />
      )}
    </div>
  )
}

export default BettingLobby
