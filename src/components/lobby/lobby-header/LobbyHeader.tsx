import { FundedBets } from "../funded-bets/FundedBets"
import { LobbyHeaderButtons } from "./LobbyHeaderButtons"

export const LobbyHeader: React.FC = () => {
  return (
    <div className="flex flex-col">
      <LobbyHeaderButtons />
      <FundedBets />
    </div>
  )
}
