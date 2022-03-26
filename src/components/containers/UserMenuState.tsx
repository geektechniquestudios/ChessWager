import { useState } from "react"
import { createContainer } from "unstated-next"
import { User } from "../../interfaces/User"

const useUserMenuState = () => {
  const [searchedUser, setSearchedUser] = useState<User>()
  const [clickedUserId, setClickedUserId] = useState<string>("")
  const [userIdFromMessages, setUserIdFromMessages] = useState<string>("")
  const [usernameFromMessages, setUsernameFromMessages] = useState<string>("")
  return {
    searchedUser,
    setSearchedUser,
    clickedUserId,
    setClickedUserId,
    userIdFromMessages,
    setUserIdFromMessages,
    usernameFromMessages,
    setUsernameFromMessages,
  }
}

export const UserMenuState = createContainer(useUserMenuState)
