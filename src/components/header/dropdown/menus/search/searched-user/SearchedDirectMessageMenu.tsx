import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"
import { ConversationData } from "../../messages/ConversationData"

export const SearchedDirectMessageMenu: React.FC = ({}) => {
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
        <ConversationData key={2} />,
      ]}
      thisMenu={"searchedUserDirectMessage"}
    />
  )
}
