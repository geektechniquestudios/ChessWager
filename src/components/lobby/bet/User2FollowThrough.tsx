import { FollowThrough } from "./FollowThrough"

interface Props {
  status: string
  user2FollowThrough: number[]
  hasUser2Paid: boolean
}

export const User2FollowThrough: React.FC<Props> = ({
  status,
  user2FollowThrough,
  hasUser2Paid,
}) => {
  return (
    <>
      {status !== "ready" && (
        <FollowThrough
          followThrough={user2FollowThrough}
          hasUserPaid={hasUser2Paid}
        />
      )}
    </>
  )
}
