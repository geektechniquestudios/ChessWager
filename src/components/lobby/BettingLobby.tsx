import { LobbyHeader } from "./lobby-header/LobbyHeader"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { CreatedByUserBets } from "./CreatedByUserBets"
import { RefreshingBets } from "./RefreshingBets"
import { RealtimeBets } from "./RealtimeBets"
import { motion } from "framer-motion"
import { WagerForm } from "./wager-form/WagerForm"
import { CreateWagerButton } from "./wager-form/CreateWagerButton"
import { useRef } from "react"

export const BettingLobby: React.FC = () => {
  const { isRealTime } = LobbyHeaderState.useContainer()

  const bettingLobbyRef = useRef<any>(null)

  return (
    <div className="flex grow justify-center">
      <motion.div
        layout
        className="border-white-400 flex max-w-7xl grow rounded-lg border border-stone-400 bg-white dark:border-stone-600 dark:bg-stone-800"
      >
        <main className="w-full">
          <LobbyHeader />
          <div
            className="scrollbar relative flex h-[36em] overflow-x-auto"
            ref={bettingLobbyRef}
          >
            <CreateWagerButton />
            <WagerForm bettingLobbyRef={bettingLobbyRef} />
            <motion.div
              className="scrollbar w-full overflow-x-auto pt-0.5 pl-[2.6rem]"
              layout
            >
              <CreatedByUserBets />
              {isRealTime ? <RealtimeBets /> : <RefreshingBets />}
            </motion.div>
          </div>
        </main>
      </motion.div>
    </div>
  )
}
