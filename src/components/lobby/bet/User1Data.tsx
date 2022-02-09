import { User1BetAmount } from "./User1BetAmount"
import { User1FollowThrough } from "./User1FollowThrough"
import { User1Image } from "./User1Image"

interface Props {
  user1FollowThrough: number[]
  user1PhotoURL: string
  user1DisplayName: string
  amount: number
  multiplier: number

}

export const User1Data: React.FC<Props> = ({
  user1FollowThrough,
  user1PhotoURL,
  user1DisplayName,
  amount,
  multiplier,
}) => {
  return (
    <div className="flex justify-center align-middle w-full border-1 rounded-sm bg-stone-300 px-1 py-0.5">
      <div className="flex justify-between w-full gap-2.5">
        <User1Image
          user1PhotoURL={user1PhotoURL}
          user1DisplayName={user1DisplayName}
        />
        <User1FollowThrough user1FollowThrough={user1FollowThrough} />
        <User1BetAmount amount={amount} multiplier={multiplier} />
      </div>
    </div>
  )
}
