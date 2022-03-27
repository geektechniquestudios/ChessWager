import "../../../../../style/scrollbar.scss"
import { useState } from "react"

export const FriendsList: React.FC = ({}) => {
  const [friends, setFriends] = useState([])

  return (
    <>
      {friends.length > 0 ? (
        <div
          className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
          style={{ direction: "rtl" }}
        />
      ) : (
        <div className="h-72 m-3 w-full justify-center flex dark:text-stone-400 text-stone-400">
          No friends yet
        </div>
      )}
    </>
  )
}