import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { FundedBets } from "./components/funded-bets/FundedBets"
import { ShowChatButton } from "./components/body/ShowChatButton"
import { motion } from "framer-motion"

interface Props {}

export const MainContent: React.FC<Props> = ({}) => {
  return (
    <motion.main className="scrollbar flex justify-center overflow-y-auto">
      <div className="flex h-full w-[10rem] shrink grow flex-col overflow-x-clip">
        <ShowChatButton />
        <div className="flex w-auto flex-col">
          <div className="scrollbar flex flex-col gap-2 overflow-hidden sm:flex-row">
            <FundedBets />
            <ChessGame />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 px-2 pb-2">
          <BettingLobby />
        </div>
      </div>
    </motion.main>
  )
}
