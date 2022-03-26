import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../DropdownItem"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"

export const HowToPlay: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="help"
          leftIcon={<BiArrowBack />}
          key={0}
          text="How to Play"
        />,
        <MenuLine key={1} />,
      ]}
      thisMenu={"howToPlay"}
    />
  )
}
