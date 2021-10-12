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
import { GameId } from "./components/containers/GameId"
import { AuthContainer } from "./components/containers/Auth"

const auth: firebase.auth.Auth = firebase.auth()

const App: React.FC = () => {
  const [user]: [
    firebase.User | null | undefined,
    boolean,
    firebase.auth.Error | undefined
  ] = useAuthState(auth)

  return (
    <AuthContainer.Provider>
      <GameId.Provider>
        <section id="page">
          <header>
            <Header />
          </header>
          <nav>
            <BettingLobby />
          </nav>
          <main>
            <ChessGame />
          </main>
          <aside>
            <GlobalChat />
          </aside>
          <footer>
            <Footer />
          </footer>
        </section>
      </GameId.Provider>
    </AuthContainer.Provider>
  )
}

export default App
