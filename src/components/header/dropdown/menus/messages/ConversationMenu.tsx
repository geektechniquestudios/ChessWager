import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"
import { ConversationData } from "./ConversationData"

interface Props {}

export const ConversationMenu: React.FC<Props> = ({}) => {
  const { usernameFromMessages } = UserMenuState.useContainer()

  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="messages"
          leftIcon={<BiArrowBack />}
          key={0}
          text={usernameFromMessages}
        />,
        <MenuLine key={1} />,
        <ConversationData key={2} />,
      ]}
      thisMenu={"conversation"}
    />
  )
}
