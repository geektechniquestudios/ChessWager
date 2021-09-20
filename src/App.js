import React from "react"
import GlobalChat from "./components/GlobalChat"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"
import BettingLobby from "./components/BettingLobby"
import ChessGame from "./components/ChessGame"
import Header from "./components/Header"

const App = () => {
  return (
    <>
      <Header />
      <BettingLobby />
      {/* <ChessGame /> */}
      <GlobalChat />
    </>
  )
}

export default App
