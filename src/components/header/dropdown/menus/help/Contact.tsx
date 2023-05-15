import { Menu } from "../../models/Menu"
import { ContactArea } from "../contact/ContactArea"

export const Contact: React.FC = ({}) => {
  return <Menu menuItems={[<ContactArea />]} thisMenu={"contact"} />
}
