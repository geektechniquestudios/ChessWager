import React from "react"

import BettingLobby from "./components/lobby/BettingLobby"
import ChessGame from "./components/game/ChessGame"
import Header from "./components/header/MainHeader"
import GlobalChat from "./components/chat/GlobalChat"
import Footer from "./components/footer/MainFooter"
import "./style/index.css"
import "./config"

const App: React.FC = () => {
  return (
    <section id="page">
      <header>
        <Header />
      </header>
      <nav>
        <BettingLobby />
      </nav>
      <main className="">
        <ChessGame />
      </main>
      <aside>
        <GlobalChat />
      </aside>
      <footer>
        <Footer />
      </footer>
    </section>
  )
}

export default App
