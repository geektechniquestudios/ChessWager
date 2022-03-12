import { BiArrowBack } from "react-icons/bi"
import { DropdownArea } from "../DropdownArea"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"
import { MessagesList } from "./MessagesList"

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
        <DropdownArea key={2} content={<MessagesList />} />,
      ]}
      thisMenu={"messages"}
    />
  )
}
