import { FaRegHandshake } from "react-icons/fa"

interface Props {
  user1FollowThrough: number[]
}

export const User1FollowThrough: React.FC<Props> = ({ user1FollowThrough }) => {
  return (
    <div className="flex flex-col justify-center w-16">
      <div className="text-xs flex justify-center align-middle">
        {user1FollowThrough[0]} / {user1FollowThrough[1]}
      </div>
      <div className="flex justify-center align-middle">
        <FaRegHandshake title="Follow-through" />
      </div>
    </div>
  )
}
