import { User1BetAmount } from "./User1BetAmount"
import { User1FollowThrough } from "./User1FollowThrough"
import { User1Spinner } from "./User1Spinner"
import { UserImage } from "./UserImage"

interface Props {
  user1FollowThrough: number[]
  user1PhotoURL: string
  user1DisplayName: string
  amount: number
  multiplier: number
  user2Id: string
  status: string
  hasUser1Paid: boolean
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
}) => {
  const fundedStyle = hasUser1Paid ? "border-positive" : ""
  return (
    <div
      className={`flex justify-center w-full border-none rounded-sm text-stone-900 dark:text-stone-300 px-1 gap-2.5 ${fundedStyle}`}
    >
      <User1Spinner user2Id={user2Id} status={status} />
      <UserImage photoURL={user1PhotoURL} displayName={user1DisplayName} />
      <User1FollowThrough user1FollowThrough={user1FollowThrough} />
      <User1BetAmount amount={amount} multiplier={multiplier} />
    </div>
  )
}
