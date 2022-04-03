import { DropdownArea } from "../../DropdownArea"
import { Menu } from "../../Menu"
import { BetsList } from "../../areas/BetsList"

export const BetsMenu: React.FC = () => {
  return (
    <Menu
      menuItems={[<DropdownArea key={2} content={<BetsList />} />]}
      thisMenu={"bets"}
    />
  )
}
