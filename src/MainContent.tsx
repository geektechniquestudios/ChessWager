import { BettingLobby } from "./components/lobby/BettingLobby"
import { ChessGame } from "./components/game/ChessGame"
import { ShowChatButton } from "./components/body/ShowChatButton"
import { motion } from "framer-motion"
import ReactGA from "react-ga4"

const measurementId = import.meta.env.VITE_MEASUREMENT_ID

interface Props {}

export const MainContent: React.FC<Props> = ({}) => {
  ReactGA.initialize(measurementId)
  return (
    <motion.main className="scrollbar flex justify-center overflow-y-auto">
      <div className="flex h-full w-[10rem] grow flex-col justify-between overflow-x-clip">
        <ShowChatButton />
        <ChessGame />
        <BettingLobby />
      </div>
    </motion.main>
  )
}
