import { LobbyHeader } from "./lobby-header/LobbyHeader"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { CreatedByUserBets } from "./CreatedByUserBets"
import { RefreshingBets } from "./RefreshingBets"
import { RealtimeBets } from "./RealtimeBets"
import { LayoutGroup, motion } from "framer-motion"
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
        className="max-w-7xl grow rounded-lg border border-stone-400 bg-white dark:border-stone-600 dark:bg-stone-800"
      >
        <LobbyHeader />
        <div className="scrollbar relative flex h-[36em] flex-col overflow-hidden">
          <div ref={bettingLobbyRef} className="h-full w-full overflow-clip">
            <CreateWagerButton />
            <WagerForm bettingLobbyRef={bettingLobbyRef} />
            <div className="scrollbar h-full w-full overflow-y-auto overflow-x-clip pt-0.5 pl-[2.6rem]">
              <LayoutGroup>
                <CreatedByUserBets />
                {isRealTime ? <RealtimeBets /> : <RefreshingBets />}
              </LayoutGroup>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
