import { useState } from "react"
import { createContainer } from "unstated-next"
import { User } from "../../interfaces/User"

const useUserMenuState = () => {
  const [searchedUser, setSearchedUser] = useState<User>()
  const [clickedUserId, setClickedUserId] = useState<string>("")
  return { searchedUser, setSearchedUser, clickedUserId, setClickedUserId }
}

export const UserMenuState = createContainer(useUserMenuState)
