import { Menu } from "../../models/Menu"
import { FriendsList } from "./FriendsList"

export const FriendsMenu: React.FC = ({}) => {
  return <Menu menuItems={[<FriendsList />]} thisMenu={"friends"} />
}
