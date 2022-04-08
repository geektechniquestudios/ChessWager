import type { User } from "../../../../../interfaces/User"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { DropdownItem } from "../../models/DropdownItem"

export const UsersListItem: React.FC<User> = (user: User) => {
  const { setSearchedUser } = UserMenuState.useContainer()

  return (
    <DropdownItem
      leftIcon={
        <img
          src={user.photoURL}
          className="w-6 h-6 rounded-full grid place-content-center"
        />
      }
      text={user.displayName}
      onClick={() => {
        setSearchedUser(user)
      }}
      goToMenu="searchedUser"
    />
  )
}