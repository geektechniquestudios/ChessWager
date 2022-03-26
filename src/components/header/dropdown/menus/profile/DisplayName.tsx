import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../DropdownItem"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"

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