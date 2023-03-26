import { AnimatePresence } from "framer-motion"
import { Bet } from "../../../../../interfaces/Bet"
import { FollowThrough } from "../../models/FollowThrough"

interface Props {
  bet: Bet
}

export const User2FollowThrough: React.FC<Props> = ({ bet }) => {
  const { status, user2FollowThrough, hasUser2Paid } = bet
  return (
    <AnimatePresence>
      {status !== "ready" && (
        <FollowThrough
          followThrough={user2FollowThrough}
          hasUserPaid={hasUser2Paid}
          isUser1={false}
        />
      )}
    </AnimatePresence>
  )
}
