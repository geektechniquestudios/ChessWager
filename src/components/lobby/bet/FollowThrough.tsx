import { FaRegHandshake } from "react-icons/fa"
import { DarkMode } from "../../containers/DarkMode"

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
    <div className="flex flex-col justify-center w-16">
      <div className="text-xs flex justify-center align-middle">
        {followThrough[0]} / {followThrough[1]}
      </div>
      <div className="flex justify-center align-middle">
        <FaRegHandshake
          className="color-shift"
          title="Follow-through"
          color={hasUserPaid ? (isDarkOn ? "#7f1d1d" : "#fecaca") : ""}
        />
      </div>
    </div>
  )
}
