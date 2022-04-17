import { DropdownArea } from "../../models/DropdownArea"
import { FriendsList } from "./FriendsList"
import { Menu } from "../../models/Menu"

export const FriendsMenu: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[<DropdownArea content={<FriendsList />} key={0} />]}
      thisMenu={"friends"}
    />
  )
}
