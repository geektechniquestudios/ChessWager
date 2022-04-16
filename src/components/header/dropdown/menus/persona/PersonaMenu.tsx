import { Menu } from "../../models/Menu"
import { UserData } from "./UserData"
import { UserDataState } from "../../../../containers/UserDataState"
import { DropdownState } from "../../../../containers/DropdownState"
import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../models/DropdownItem"
import { MenuLine } from "../../models/MenuLine"

export const PersonaMenu: React.FC = ({}) => {
  const { userData } = UserDataState.useContainer()
  const { menuStack } = DropdownState.useContainer()
  return (
    <>
      {menuStack.length < 2 ? (
        <Menu
          menuItems={[<UserData key={0} {...userData} />]}
          thisMenu={"persona"}
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
            <UserData key={2} {...userData} />,
          ]}
          thisMenu={"persona"}
        />
      )}
    </>
  )
}
