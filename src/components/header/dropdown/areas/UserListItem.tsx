import { User } from "../../../../interfaces/User"
import { UserMenuState } from "../../../containers/UserMenuState"
import { DropdownItem } from "../DropdownItem"

export const UserListItem: React.FC<User> = (user: User) => {
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
