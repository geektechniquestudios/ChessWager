import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"
import { BlockedList } from "./BlockedList"

interface Props {}

export const BlockedMenu: React.FC<Props> = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="persona"
          key={0}
          text="Blocked Users"
          leftIcon={<BiArrowBack />}
        />,
        <MenuLine />,
        <BlockedList />,
      ]}
      thisMenu="blocked"
    />
  )
}
