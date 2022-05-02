import { WagerForm } from "./wager-form/WagerForm"
import { LobbyHeader } from "./lobby-header/LobbyHeader"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { CreatedByUserBets } from "./CreatedByUserBets"
import { RefreshingBets } from "./RefreshingBets"
import { RealtimeBets } from "./RealtimeBets"

export const BettingLobby: React.FC = () => {
  const { isRealTime } = LobbyHeaderState.useContainer()
  return (
    <div className="flex border-t border-stone-400 dark:border-stone-600">
      <WagerForm />
      <main className="w-full">
        <div className="overflow-y-hidden">
          <LobbyHeader />
          <div className="overflow-y-hidden h-full overflow-x-auto pt-0.5">
            <CreatedByUserBets />
            {isRealTime ? <RealtimeBets /> : <RefreshingBets />}
          </div>
        </div>
      </main>
    </div>
  )
}
