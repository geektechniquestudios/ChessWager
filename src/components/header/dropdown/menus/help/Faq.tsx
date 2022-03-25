import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../DropdownItem"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"

export const Faq: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="help"
          leftIcon={<BiArrowBack />}
          key={0}
          text="FAQs"
        />,
        <MenuLine key={1} />,
      ]}
      thisMenu={"faq"}
    />
  )
}
