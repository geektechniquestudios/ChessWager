import { useState } from "react"
import { createContainer } from "unstated-next"
import { User } from "../../interfaces/User"

const useUserMenuState = () => {
  const [searchedUser, setSearchedUser] = useState<User>()
  return { searchedUser, setSearchedUser }
}

export const UserMenuState = createContainer(useUserMenuState)
