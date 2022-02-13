import { Auth } from "../../containers/Auth"
import { ApproveButton } from "./ApproveButton"
import { ApproveKickWrapper } from "./ApproveKickWrapper"
import { JoinButton } from "./JoinButton"
import { KickButton } from "./KickButton"
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
}) => {
  return (
    <div
      className={` ${
        hasUser2Paid ? "border-positive" : ""
      } flex justify-center align-middle w-full border-1 rounded-sm bg-stone-300 px-2 py-0.5`}
    >
      <div className="flex justify-between w-full gap-2.5">
        <User2BetAmount amount={amount} multiplier={multiplier} />
        <User2FollowThrough
          user2FollowThrough={user2FollowThrough}
          status={status}
        />
        <User2Image
          user2PhotoURL={user2PhotoURL}
          user2DisplayName={user2DisplayName}
          status={status}
        />
        <User2Spinner status={status} user1Id={user1Id} />
        <JoinButton
          id={id}
          user1Id={user1Id}
          isSelected={isSelected}
          status={status}
        />
        <ApproveKickWrapper user1Id={user1Id} status={status} id={id} />
      </div>
    </div>
  )
}
