import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../containers/UserMenuState"
import { SearchedConversation } from "../areas/SearchedConversation"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"

interface Props {}

export const ClickedDirectMessage: React.FC<Props> = ({}) => {
  const { clickedUserId, clickedUser } = UserMenuState.useContainer()

  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="clickedUser"
          leftIcon={<BiArrowBack />}
          key={0}
          text={clickedUser?.displayName ?? ""}
        />,
        <MenuLine key={1} />,
        <SearchedConversation key={2} />,
      ]}
      thisMenu={"clickedDirectMessage"}
    />
  )
}
