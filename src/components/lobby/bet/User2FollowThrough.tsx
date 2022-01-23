import { FaRegHandshake } from "react-icons/fa"

interface Props {
  status: string
  user2FollowThrough: number[]
}

export const User2FollowThrough: React.FC<Props> = ({
  status,
  user2FollowThrough,
}) => {
  return (
    <>
      {status !== "ready" && (
        <div className="border flex flex-col justify-center w-16">
          <div>
            <div className="text-xs flex justify-center align-middle">
              {user2FollowThrough[0]} / {user2FollowThrough[1]}
            </div>
            <div className="flex justify-center align-middle">
              <FaRegHandshake title="Follow-through" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
