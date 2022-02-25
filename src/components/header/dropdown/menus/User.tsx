import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"

export const User: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="searchUsers"
          leftIcon={<BiArrowBack />}
          key={0}
          text="User"
        />,
        <MenuLine key={1} />,
      ]}
      thisMenu={"user"}
    />
  )
}
