import { DropdownMenu } from "./DropdownMenu"
import { Menu } from "./Menu"
import { NavItem } from "./NavItem"
import "../../../style/header.scss"

export const Dropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <NavItem msg="👑">
        <Menu></Menu>
      </NavItem>
    </DropdownMenu>
  )
}
