import { DropdownItem } from "../../DropdownItem"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"

export const Stats: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="profile"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Stats"
          />,
          <MenuLine key={1} />,
          <DropdownItem key={2} text="Number of Bets" />,
          <DropdownItem key={3} text="Net Profit" />,
          <DropdownItem key={4} text="Total Profit" />,
          <DropdownItem key={5} text="Follow Through" />,
        ]}
        thisMenu={"stats"}
      />
    </>
  )
}
