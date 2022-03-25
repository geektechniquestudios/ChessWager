import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../containers/UserMenuState"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"
import { ConversationData } from "./ConversationData"

interface Props {}

export const Conversation: React.FC<Props> = ({}) => {
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
