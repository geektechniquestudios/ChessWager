import { Menu } from "../../models/Menu"
import { BlockedList } from "./BlockedList"

interface Props {}

export const BlockedMenu: React.FC<Props> = ({}) => {
  return <Menu menuItems={[<BlockedList />]} thisMenu="blocked" />
}
