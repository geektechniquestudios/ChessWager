import { Menu } from "../../models/Menu"
import { UserData } from "../persona/UserData"
import { UserMenuState } from "../../../../containers/UserMenuState"

export const ClickedUserMenu: React.FC = ({}) => {
  const { clickedUser, isLoading } = UserMenuState.useContainer()
  return (
    <Menu
      menuItems={[<UserData user={clickedUser} isLoading={isLoading} />]}
      thisMenu={"clickedUser"}
    />
  )
}
