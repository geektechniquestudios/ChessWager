import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { BetsListArea } from "./BetsListArea"

export const BetsMenu: React.FC = () => {
  return (
    <Menu
      menuItems={[<DropdownArea content={<BetsListArea />} />]}
      thisMenu="bets"
    />
  )
}
