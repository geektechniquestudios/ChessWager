import { Menu } from "../../models/Menu"
import { UserData } from "../persona/UserData"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { DropdownItem } from "../../models/DropdownItem"
import { BiArrowBack } from "react-icons/bi"
import { DropdownState } from "../../../../containers/DropdownState"
import { MenuLine } from "../../models/MenuLine"

export const ClickedUserMenu: React.FC = ({}) => {
  const { clickedUser } = UserMenuState.useContainer()
  const { menuStack, setMenuStack } = DropdownState.useContainer()
  return (
    <>
      {menuStack.length < 2 ? (
        <Menu
          menuItems={[<UserData key={0} {...clickedUser} />]}
          thisMenu={"clickedUser"}
        />
      ) : (
        <Menu
          menuItems={[
            <DropdownItem
              isBackButton
              leftIcon={<BiArrowBack />}
              key={0}
              text={menuStack[menuStack.length - 1]}
            />,
            <MenuLine key={1} />,
            <UserData key={2} {...clickedUser} />,
          ]}
          thisMenu={"clickedUser"}
        />
      )}
    </>
  )
}
