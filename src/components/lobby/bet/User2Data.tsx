import { User2BetAmount } from "./User2BetAmount"
import { User2FollowThrough } from "./User2FollowThrough"
import { User2Image } from "./User2Image"

interface Props {
  user2FollowThrough: number[]
  user2PhotoURL: string
  user2DisplayName: string
  amount: number
  multiplier: number
  status: string
  isSelected: boolean
  user1Id: string
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
}) => {
  return (
    <div className="flex justify-center align-middle w-full">
      <div className="flex justify-between w-full">
        <User2BetAmount amount={amount} multiplier={multiplier} />
        <User2Image
          user2PhotoURL={user2PhotoURL}
          user2DisplayName={user2DisplayName}
          user1Id={user1Id}
          status={status}
          isSelected={isSelected}
        />
        <User2FollowThrough
          user2FollowThrough={user2FollowThrough}
          status={status}
        />
      </div>
    </div>
  )
}
