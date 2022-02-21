import { FaRegHandshake } from "react-icons/fa"

interface Props {
  followThrough: number[]
  hasUserPaid: boolean
}

export const FollowThrough: React.FC<Props> = ({
  followThrough,
  hasUserPaid,
}) => {
  return (
    <div className="flex flex-col justify-center w-16">
      <div className="text-xs flex justify-center align-middle">
        {followThrough[0]} / {followThrough[1]}
      </div>
      <div className="flex justify-center align-middle">
        <FaRegHandshake
          title="Follow-through"
          color={hasUserPaid ? "green" : ""}
        />
      </div>
    </div>
  )
}
