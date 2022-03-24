import { BiArrowBack } from "react-icons/bi"
import { DropdownArea } from "../DropdownArea"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"
import { ConversationsList } from "./ConversationsList"

export const Messages: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="profile"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Messages"
        />,
        <MenuLine key={1} />,
        <DropdownArea key={2} content={<ConversationsList />} />,
      ]}
      thisMenu={"messages"}
    />
  )
}
