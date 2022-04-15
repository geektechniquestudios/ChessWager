import { Dispatch, SetStateAction } from "react"
import { FiUsers } from "react-icons/fi"
import { RiUserHeartLine } from "react-icons/ri"
import { DropdownButton } from "../persona/buttons/DropdownButton"

interface Props {
  friendsOrEveryone: "friends" | "everyone"
  setFriendsOrEveryone: Dispatch<SetStateAction<"friends" | "everyone">>
}

export const SearchToggle: React.FC<Props> = ({
  friendsOrEveryone,
  setFriendsOrEveryone,
}) => {
  const selectedStyle =
    "border-stone-400 dark:border-stone-800 text-stone-800 dark:text-stone-300 bg-white dark:bg-stone-800"
  return (
    <div className="flex flex-col py-1 px-1.5 gap-1">
      <button
        className={`flex gap-2 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white color-shift rounded-full items-center pl-1 ${
          friendsOrEveryone === "everyone" ? selectedStyle : ""
        }`}
        title={"Everyone"}
        onClick={() => {
          setFriendsOrEveryone("everyone")
        }}
      >
        <div className="rounded-full grid place-content-center color-shift clickable text-stone-800 dark:text-stone-300 p-1.5 bg-transparent">
          <FiUsers />
        </div>
        <p className="mx-2">Everyone</p>
      </button>
      <button
        className={`flex gap-2 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white color-shift rounded-full items-center pl-1 ${
          friendsOrEveryone === "friends" ? selectedStyle : ""
        }`}
        title={"Friends"}
        onClick={() => {
          setFriendsOrEveryone("friends")
        }}
      >
        <div className="rounded-full grid place-content-center color-shift clickable text-stone-800 dark:text-stone-300 p-1.5 bg-transparent">
          <RiUserHeartLine />
        </div>
        <p className="mx-2">Friends Only</p>
      </button>
    </div>
  )
}
