import { FaRegHandshake } from "react-icons/fa"
import { DarkMode } from "../../../containers/DarkMode"

interface Props {
  followThrough: number[]
  hasUserPaid: boolean
}

export const FollowThrough: React.FC<Props> = ({
  followThrough,
  hasUserPaid,
}) => {
  const { isDarkOn } = DarkMode.useContainer()
  return (
    <div className="flex flex-col justify-center lg:w-16">
      <div className="flex justify-center align-middle text-xs">
        {followThrough[0]} / {followThrough[1]}
      </div>
      <div className="flex justify-center align-middle">
        <FaRegHandshake
          className="color-shift"
          title="Follow-through"
          color={hasUserPaid ? (isDarkOn ? "#86efac" : "#22c55e") : ""}
        />
      </div>
    </div>
  )
}
