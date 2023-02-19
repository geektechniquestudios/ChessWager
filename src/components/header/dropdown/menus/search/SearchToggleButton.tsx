import { Dispatch, SetStateAction } from "react"
import { RiUserHeartLine } from "react-icons/ri"

interface Props {
  thisMenu: "friends" | "everyone"
  friendsOrEveryone: "friends" | "everyone"
  setFriendsOrEveryone: Dispatch<SetStateAction<"friends" | "everyone">>
  icon: JSX.Element
  text: string
}

export const SearchToggleButton: React.FC<Props> = ({
  thisMenu,
  friendsOrEveryone,
  setFriendsOrEveryone,
  icon,
  text,
}) => {
  const selectedStyle =
    "border-stone-400 dark:border-stone-500 text-stone-800 dark:text-stone-300 bg-white dark:bg-stone-600"
  return (
    <button
      className={`color-shift flex items-center gap-2 rounded-full border pl-1 hover:border-stone-500 hover:text-black dark:hover:border-stone-400 dark:hover:text-white ${
        friendsOrEveryone === thisMenu ? selectedStyle : "border-transparent"
      }`}
      onClick={() => {
        setFriendsOrEveryone(thisMenu)
      }}
    >
      <div className="color-shift clickable grid place-content-center rounded-full bg-transparent p-1.5 text-stone-800 dark:text-stone-300">
        {icon}
      </div>
      <p className="mx-2">{text}</p>
    </button>
  )
}
