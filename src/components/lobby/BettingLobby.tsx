import { WagerForm } from "./wager-form/WagerForm"
import { LobbyHeader } from "./lobby-header/LobbyHeader"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { CreatedByUserBets } from "./CreatedByUserBets"
import { RefreshingBets } from "./RefreshingBets"
import { RealtimeBets } from "./RealtimeBets"

export const BettingLobby: React.FC = () => {
  const { isRealTime } = LobbyHeaderState.useContainer()

  return (
    <div className="border-t border-stone-400 bg-stone-400 dark:border-stone-600 dark:bg-stone-800 sm:flex">
      <WagerForm />
      <main className="w-full">
        <div className="overflow-y-hidden">
          <LobbyHeader />
          <div className="h-full overflow-x-auto overflow-y-hidden pt-0.5">
            <CreatedByUserBets />
            {isRealTime ? <RealtimeBets /> : <RefreshingBets />}
          </div>
        </div>
      </main>
    </div>
  )
}
