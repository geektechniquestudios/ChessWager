import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { ShowChatButton } from "./components/body/ShowChatButton"
import { motion } from "framer-motion"


interface Props {}

export const MainContent: React.FC<Props> = ({}) => {
  return (
    <main className="scrollbar flex justify-center overflow-y-auto">
      <div className="flex h-full w-[10rem] grow flex-col justify-between overflow-x-clip">
        <ShowChatButton />
        <ChessGame />
        <BettingLobby />
      </div>
    </main>
  )
}
