import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"
import { UserData } from "../../persona/UserData"
import { UserMenuState } from "../../../../../containers/UserMenuState"

export const SearchedUserMenu: React.FC = ({}) => {
  const { searchedUser } = UserMenuState.useContainer()
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="searchUsers"
          leftIcon={<BiArrowBack />}
          key={0}
          text={"Search"}
        />,
        <MenuLine key={1} />,
        <UserData key={2} {...searchedUser} activeMenu="searchedUser" />,
      ]}
      thisMenu={"searchedUser"}
    />
  )
}
