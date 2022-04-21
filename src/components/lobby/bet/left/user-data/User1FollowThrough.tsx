import { FollowThrough } from "../../models/FollowThrough"

interface Props {
  user1FollowThrough: number[]
  hasUser1Paid: boolean
}

export const User1FollowThrough: React.FC<Props> = ({
  user1FollowThrough,
  hasUser1Paid,
}) => {
  return (
    <FollowThrough
      followThrough={user1FollowThrough}
      hasUserPaid={hasUser1Paid}
    />
  )
}
