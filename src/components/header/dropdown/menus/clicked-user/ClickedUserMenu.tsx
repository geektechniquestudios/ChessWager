import { Menu } from "../../models/Menu"
import { UserData } from "../persona/UserData"
import { UserMenuState } from "../../../../containers/UserMenuState"

export const ClickedUserMenu: React.FC = ({}) => {
  const { clickedUser } = UserMenuState.useContainer()
  return (
    <Menu
      menuItems={[<UserData key={2} {...clickedUser} />]}
      thisMenu={"clickedUser"}
    />
  )
}
