import "./style/index.scss"
import "./style/scrollbar.scss"
import "./config"

import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { MainHeader } from "./components/header/MainHeader"
import { GlobalChat } from "./components/chat/GlobalChat"
import { FundedBets } from "./components/funded-bets/FundedBets"
import { DarkMode } from "./components/containers/DarkMode"
import { ChatToggle } from "./components/containers/ChatToggle"
import { ShowChatButton } from "./components/body/ShowChatButton"
import { Alert, AlertTitle, IconButton } from "@mui/material"
import { useState } from "react"
import { BsX } from "react-icons/bs"

export const App: React.FC = () => {
  const { isDarkOn } = DarkMode.useContainer()
  const { showChat } = ChatToggle.useContainer()

  const dark = isDarkOn ? "dark" : ""


  return (
    <div className={`${dark} h-full w-full overflow-y-hidden grid global-font`}>
      <div
        className="color-shift grid bg-stone-300 dark:bg-black overflow-hidden"
        id="page"
      >
        <header className="color-shift bg-stone-50 dark:bg-stone-800 border-b border-stone-400 dark:border-stone-700 flex items-center">
          <MainHeader />
        </header>

        <main className="scrollbar overflow-y-auto flex justify-center">
          <div className="w-full">
            <ShowChatButton />
            <div className="flex flex-col w-auto">
              <div className="scrollbar flex overflow-y-hidden overflow-x-visible">
                <FundedBets />
                <ChessGame />
              </div>
            </div>
            <BettingLobby />
          </div>
        </main>

        <div>
          {showChat && (
            <aside className="h-full">
              <GlobalChat />
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
