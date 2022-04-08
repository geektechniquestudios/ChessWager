import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"

export const Contact: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="help"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Contact Us"
        />,
        <MenuLine key={1} />,
      ]}
      thisMenu={"contact"}
    />
  )
}
