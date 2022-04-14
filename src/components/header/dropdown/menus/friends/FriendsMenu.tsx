import { DropdownArea } from "../../models/DropdownArea"
import { FriendsList } from "./FriendsList"
import { Menu } from "../../models/Menu"
import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../models/DropdownItem"
import { MenuLine } from "../../models/MenuLine"

export const FriendsMenu: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[<DropdownArea content={<FriendsList />} />]}
      thisMenu={"friends"}
    />
  )
}
