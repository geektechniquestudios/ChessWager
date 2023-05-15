import { Menu } from "../../models/Menu"
import { BetsListArea } from "./BetsListArea"

export const BetsMenu: React.FC = () => {
  return <Menu menuItems={[<BetsListArea />]} thisMenu="bets" />
}
