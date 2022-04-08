import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"

export const Membership: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="store"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Membership"
        />,
        <MenuLine key={1} />,
      ]}
      thisMenu={"membership"}
    />
  )
}