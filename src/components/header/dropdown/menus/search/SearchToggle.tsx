import { Dispatch, SetStateAction } from "react"
import { FiUsers } from "react-icons/fi"
import { RiUserHeartLine } from "react-icons/ri"
import { SearchToggleButton } from "./SearchToggleButton"

interface Props {
  friendsOrEveryone: "friends" | "everyone"
  setFriendsOrEveryone: Dispatch<SetStateAction<"friends" | "everyone">>
}

export const SearchToggle: React.FC<Props> = ({
  friendsOrEveryone,
  setFriendsOrEveryone,
}) => {
  return (
    <div className="flex flex-col gap-1 p-1.5">
      <SearchToggleButton
        thisMenu="everyone"
        friendsOrEveryone={friendsOrEveryone}
        setFriendsOrEveryone={setFriendsOrEveryone}
        icon={<FiUsers />}
        text="Everyone"
      />
      <SearchToggleButton
        thisMenu="friends"
        friendsOrEveryone={friendsOrEveryone}
        setFriendsOrEveryone={setFriendsOrEveryone}
        icon={<RiUserHeartLine />}
        text="Friends Only"
      />
    </div>
  )
}
