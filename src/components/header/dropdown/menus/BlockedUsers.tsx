import "../../../../style/dropdown.scss"
import { DropdownItem } from "../DropdownItem"
import { BsArrowLeft } from "react-icons/bs"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"
import { DropdownArea } from "../DropdownArea"
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
