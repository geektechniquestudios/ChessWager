import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { ContactArea } from "../contact/ContactArea"

export const Contact: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[<DropdownArea content={<ContactArea />} />]}
      thisMenu={"contact"}
    />
  )
}
