import React, { useState } from "react"

import BettingLobby from "./components/lobby/BettingLobby"
import ChessGame from "./components/game/ChessGame"
import MainHeader from "./components/header/MainHeader"
import GlobalChat from "./components/chat/GlobalChat"
import Footer from "./components/footer/MainFooter"
import "./style/index.css"
import "./config"

const App: React.FC = () => {
  const [isDarkOn, setIsDarkOn] = useState(false)

  return (
    <div className={isDarkOn ? "dark" : ""}>
      <section id="page">
        <header className="bg-gradient-to-b from-gray-900 via-gray-900 min-w-full">
          <MainHeader setIsDarkOn={setIsDarkOn} />
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
    </div>
  )
}

export default App
