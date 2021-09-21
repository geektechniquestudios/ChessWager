import React from "react"
import GlobalChat from "./components/GlobalChat"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"
import BettingLobby from "./components/BettingLobby"
import ChessGame from "./components/ChessGame"
import Header from "./components/Header"
import "./style/index.css"
import Footer from "./components/Footer"
import { useAuthState } from "react-firebase-hooks/auth"

const auth = firebase.auth()

const App = () => {
  const [user] = useAuthState(auth)
  return (
    <section id="page">
      <header><Header user={user}/></header>
      <nav><BettingLobby /></nav>
      <main><ChessGame /></main>
      <aside><GlobalChat user={user} auth={auth}/></aside>
      <footer><Footer /></footer>
    </section>
  )
}

export default App
