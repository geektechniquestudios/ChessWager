import { DropdownItem } from "../../../models/DropdownItem"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"

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
