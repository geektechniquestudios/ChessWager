import { BiArrowBack } from "react-icons/bi"
import { DropdownArea } from "../../DropdownArea"
import { DropdownItem } from "../../DropdownItem"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"
import { BetsList } from "../../areas/BetsList"

export const BetsMenu: React.FC = () => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="profile"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Bets"
        />,
        <MenuLine key={1} />,
        <DropdownArea key={2} content={<BetsList />} />,
      ]}
      thisMenu={"bets"}
    />
  )
}
