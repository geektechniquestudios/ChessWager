import { Auth } from "../../../../containers/Auth"
import { ApproveKickWrapper } from "../buttons/ApproveKickWrapper"
import { JoinButton } from "../buttons/JoinButton"
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
  const { user } = Auth.useContainer()
  return (
    <div className="color-shift m-0.5 flex flex-col-reverse justify-between rounded-md border border-stone-400 bg-stone-200 p-0.5 px-0.5 text-xs text-stone-900 dark:border-stone-500 dark:bg-stone-700 dark:text-stone-300 lg:flex-row">
      <ApproveKickWrapper
        user1Id={user1Id}
        user2Id={user2Id}
        status={status}
        id={id}
      />
      <div className="flex justify-between px-1">
        <User2BetAmount amount={amount} multiplier={multiplier} />
        <User2FollowThrough
          user2FollowThrough={user2FollowThrough}
          status={status}
          hasUser2Paid={hasUser2Paid}
        />
      </div>
      <User2Spinner status={status} user1Id={user1Id} />
      <User2Image
        user2PhotoURL={user2PhotoURL}
        user2DisplayName={user2DisplayName}
        status={status}
        user2Id={user2Id}
      />
      {user && (
        <JoinButton
          id={id}
          user1Id={user1Id}
          isSelected={isSelected}
          status={status}
        />
      )}
    </div>
  )
}
