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

const App = () => {
  return (
    <section id="page">
      {/* <Header className="header"/> */}
      <header>header</header>
      {/* <BettingLobby className="lobby"/> */}
      <nav>nav</nav>
      {/* <ChessGame className="game"/> */}
      <main><ChessGame /></main>
      {/* <GlobalChat className="chat"/> */}
      <aside><GlobalChat /></aside>
      {/* <Footer className="footer" /> */}
      <footer>footer</footer>
    </section>
  )
}

export default App
