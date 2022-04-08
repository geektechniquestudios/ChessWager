import { DropdownItem } from "../../../models/DropdownItem"
import { BsArrowLeft } from "react-icons/bs"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"
import { DropdownArea } from "../../../models/DropdownArea"
import { BlockedList } from "./BlockedList"

export const BlockedUsers: React.FC = () => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          leftIcon={<BsArrowLeft />}
          goToMenu="settings"
          key={0}
          text="Blocked Users"
        />,
        <MenuLine key={1} />,
        <DropdownArea key={2} content={<BlockedList />} />,
      ]}
      thisMenu={"blockedUsers"}
    />
  )
}
