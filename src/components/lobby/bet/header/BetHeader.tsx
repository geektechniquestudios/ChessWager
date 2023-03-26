import { Bet } from "../../../../interfaces/Bet"
import { UserName } from "../models/UserName"

interface Props {
  betHeaderStyle: string
  bet: Bet
}

export const BetHeader: React.FC<Props> = ({ betHeaderStyle, bet }) => {
  return (
    <div
      className={`${betHeaderStyle} color-shift absolute top-0 flex h-4 w-full justify-between border-b border-stone-500 bg-stone-600`}
    >
      <UserName displayName={bet.user1DisplayName} isUser1 />
      <UserName displayName={bet.user2DisplayName} isUser1={false} />
    </div>
  )
}
