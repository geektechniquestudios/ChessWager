import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"

export const DisplayName: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="profile"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Display Name"
        />,
        <MenuLine key={1} />,
      ]}
      thisMenu={"displayName"}
    />
  )
}