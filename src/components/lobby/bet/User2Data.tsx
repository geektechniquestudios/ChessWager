import { ApproveKickWrapper } from "./ApproveKickWrapper"
import { JoinButton } from "./JoinButton"
import { User2BetAmount } from "./User2BetAmount"
import { User2FollowThrough } from "./User2FollowThrough"
import { User2Image } from "./User2Image"
import { User2Spinner } from "./User2Spinner"

interface Props {
  user2FollowThrough: number[]
  user2PhotoURL: string
  user2DisplayName: string
  amount: number
  multiplier: number
  status: string
  isSelected: boolean
  user1Id: string
  id: string
  hasUser2Paid: boolean
  user2Id: string
}

export const User2Data: React.FC<Props> = ({
  user2FollowThrough,
  user2PhotoURL,
  user2DisplayName,
  user1Id,
  amount,
  multiplier,
  status,
  isSelected,
  id,
  hasUser2Paid,
  user2Id,
}) => {
  return (
    <div className="color-shift flex justify-center w-full border-none text-stone-900 dark:text-stone-300 px-1 gap-2.5">
      <User2BetAmount amount={amount} multiplier={multiplier} />
      <User2FollowThrough
        user2FollowThrough={user2FollowThrough}
        status={status}
        hasUser2Paid={hasUser2Paid}
      />
      <User2Image
        user2PhotoURL={user2PhotoURL}
        user2DisplayName={user2DisplayName}
        status={status}
        user2Id={user2Id}
      />
      <User2Spinner status={status} user1Id={user1Id} />
      <JoinButton
        id={id}
        user1Id={user1Id}
        isSelected={isSelected}
        status={status}
      />
      <ApproveKickWrapper user1Id={user1Id} user2Id={user2Id} status={status} id={id} />
    </div>
  )
}
