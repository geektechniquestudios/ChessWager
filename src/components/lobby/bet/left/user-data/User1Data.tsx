import { User1BetAmount } from "./User1BetAmount"
import { User1FollowThrough } from "./User1FollowThrough"
import { User1Spinner } from "./User1Spinner"
import { UserImage } from "../../models/UserImage"

interface Props {
  user1FollowThrough: number[]
  user1PhotoURL: string
  user1DisplayName: string
  amount: number
  multiplier: number
  user2Id: string
  status: string
  hasUser1Paid: boolean
  user1Id: string
}

export const User1Data: React.FC<Props> = ({
  user1FollowThrough,
  user1PhotoURL,
  user1DisplayName,
  amount,
  multiplier,
  user2Id,
  status,
  hasUser1Paid,
  user1Id,
}) => {
  return (
    <div className="color-shift m-0.5 flex justify-center rounded-md border border-stone-400 bg-stone-200 px-0.5 text-xs text-stone-900 dark:border-stone-500 dark:bg-stone-700 dark:text-stone-300">
      <User1Spinner user2Id={user2Id} status={status} />
      <UserImage
        photoURL={user1PhotoURL}
        displayName={user1DisplayName}
        userId={user1Id}
      />
      <User1FollowThrough
        user1FollowThrough={user1FollowThrough}
        hasUser1Paid={hasUser1Paid}
      />
      <User1BetAmount amount={amount} multiplier={multiplier} />
    </div>
  )
}
