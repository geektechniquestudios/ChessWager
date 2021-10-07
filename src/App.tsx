import React from "react"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"

import BettingLobby from "./components/lobby/BettingLobby"
import ChessGame from "./components/game/ChessGame"
import Header from "./components/header/MainHeader"
import GlobalChat from "./components/chat/GlobalChat"
import Footer from "./components/footer/MainFooter"
import { useAuthState } from "react-firebase-hooks/auth"
import "./style/index.css"
import "./config"

const auth: firebase.auth.Auth = firebase.auth()

const App: React.FC = () => {
  const [user]: [
    firebase.User | null | undefined,
    boolean,
    firebase.auth.Error | undefined
  ] = useAuthState(auth)

  return (
    <section id="page">
      <header>
        <Header user={user} auth={auth} />
      </header>
      <nav>
        <BettingLobby user={user} auth={auth} />
      </nav>
      <main>
        <ChessGame />
      </main>
      <aside>
        <GlobalChat user={user} auth={auth} />
      </aside>
      <footer id="footer-container">
        <Footer />
      </footer>
    </section>
  )
}

export default App
