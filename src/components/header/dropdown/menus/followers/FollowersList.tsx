import { useState } from "react"
import { Menu } from "../../models/Menu"

interface Props {}

export const FollowersList: React.FC<Props> = ({}) => {
  const [followers, setFollowers] = useState([])
  return (
    <div>
      {followers.length > 0 ? (
        <div
          className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
          style={{ direction: "rtl" }}
        />
      ) : (
        <div className="h-72 mt-10 w-64 justify-center flex dark:text-stone-400 text-stone-400">
          No followers yet
        </div>
      )}
    </div>
  )
}
