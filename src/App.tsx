import "./style/index.scss"
import "./style/scrollbar.scss"

import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { MainHeader } from "./components/header/MainHeader"
import { GlobalChat } from "./components/chat/GlobalChat"
import { FundedBets } from "./components/funded-bets/FundedBets"
import { DarkMode } from "./components/containers/DarkMode"
import { ChatToggle } from "./components/containers/ChatToggle"
import { ShowChatButton } from "./components/body/ShowChatButton"

export const App: React.FC = () => {
  const { isDarkOn } = DarkMode.useContainer()
  const { showChat } = ChatToggle.useContainer()

  const dark = isDarkOn ? "dark" : ""

  return (
    <div
      className={`${dark} global-font grid h-full w-full overflow-y-hidden`}
      id="app"
    >
      <div
        className="color-shift grid overflow-hidden bg-stone-300 dark:bg-black"
        id="page"
      >
        <header className="color-shift flex items-center border-b border-stone-400 bg-stone-50 dark:border-stone-700 dark:bg-stone-800">
          <MainHeader />
        </header>

        <main className="scrollbar flex justify-center overflow-y-auto">
          <div className="w-full">
            <ShowChatButton />
            <div className="flex w-auto flex-col">
              <div className="scrollbar overflow-y-hidden overflow-x-visible sm:flex">
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
