import { Bet } from "../../../../../interfaces/Bet"
import { FollowThrough } from "../../models/FollowThrough"

interface Props {
  bet: Bet
}

export const User1FollowThrough: React.FC<Props> = ({ bet }) => {
  const { user1FollowThrough, hasUser1Paid } = bet
  return (
    <FollowThrough
      followThrough={user1FollowThrough}
      hasUserPaid={hasUser1Paid}
      isUser1
    />
  )
}
