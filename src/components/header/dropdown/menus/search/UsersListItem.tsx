import type { User } from "../../../../../interfaces/User"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { DropdownItem } from "../../models/DropdownItem"

export const UsersListItem: React.FC<User> = (user: User) => {
  const { setClickedUser } = UserMenuState.useContainer()

  return (
    <DropdownItem
      leftIcon={
        <img
          src={user.photoURL}
          className="grid h-6 w-6 place-content-center rounded-full"
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
