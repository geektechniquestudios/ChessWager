import { Menu } from "../../models/Menu"
import { RequestList } from "./RequestList"

interface Props {}

export const RequestMenu: React.FC<Props> = ({}) => {
  return <Menu menuItems={[<RequestList />]} thisMenu="requests" />
}
