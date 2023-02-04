import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { FundedBets } from "./components/funded-bets/FundedBets"
import { ShowChatButton } from "./components/body/ShowChatButton"
import { motion } from "framer-motion"

interface Props {}

export const MainContent: React.FC<Props> = ({}) => {
  return (
    <motion.main className="scrollbar flex justify-center overflow-y-auto">
      <div className="flex h-full w-full flex-col">
        <ShowChatButton />
        <div className="flex w-auto flex-col">
          <div className="scrollbar overflow-y-hidden overflow-x-visible sm:flex">
            <FundedBets />
            <ChessGame />
          </div>
        </div>
        <BettingLobby />
      </div>
    </motion.main>
  )
}
