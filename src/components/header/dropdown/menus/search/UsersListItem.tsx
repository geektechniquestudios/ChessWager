import type { User } from "../../../../../interfaces/User"
import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { DropdownItem } from "../../models/DropdownItem"

export const UsersListItem: React.FC<User> = (user: User) => {
  const { setClickedUser } = UserMenuState.useContainer()

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
        setClickedUser(user)
      }}
      goToMenu="clickedUser"
    />
  )
}
