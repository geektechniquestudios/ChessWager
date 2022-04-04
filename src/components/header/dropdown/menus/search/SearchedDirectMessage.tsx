import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { SearchedConversation } from "../../areas/SearchedConversation"
import { DropdownItem } from "../../DropdownItem"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"

export const SearchedDirectMessage: React.FC = ({}) => {
  const { searchedUser } = UserMenuState.useContainer()
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="searchedUser"
          leftIcon={<BiArrowBack />}
          key={0}
          text={searchedUser?.displayName ?? ""}
        />,
        <MenuLine key={1} />,
        <SearchedConversation key={2} />,
      ]}
      thisMenu={"searchedDirectMessage"}
    />
  )
}
