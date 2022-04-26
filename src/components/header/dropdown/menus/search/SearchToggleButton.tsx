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
    "border-stone-400 dark:border-stone-800 text-stone-800 dark:text-stone-300 bg-white dark:bg-stone-800"
  return (
    <button
      className={`border flex gap-2 hover:text-black hover:border-stone-500 dark:hover:text-white dark:hover:border-stone-400 color-shift rounded-full items-center pl-1 ${
        friendsOrEveryone === thisMenu ? selectedStyle : "border-transparent"
      }`}
      onClick={() => {
        setFriendsOrEveryone(thisMenu)
      }}
    >
      <div className="rounded-full grid place-content-center color-shift clickable text-stone-800 dark:text-stone-300 p-1.5 bg-transparent">
        {icon}
      </div>
      <p className="mx-2">{text}</p>
    </button>
  )
}
