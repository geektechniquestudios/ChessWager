import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"
import { UserData } from "../areas/UserData"
import { UserMenuState } from "../../../containers/UserMenuState"

export const Persona: React.FC = ({}) => {
  const { searchedUser } = UserMenuState.useContainer()
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="profile"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Persona"
        />,
        <MenuLine key={1} />,
        <UserData key={2} {...searchedUser} />,
      ]}
      thisMenu={"persona"}
    />
  )
}
