import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"
import { FriendsList } from "../../friends/FriendsList"
import { RequestList } from "../../requests/RequestList"

interface Props {}

export const RequestsFromNotificationsMenu: React.FC<Props> = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="notifications"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Friend Requests"
        />,
        <MenuLine key={1} />,
        <RequestList key={2} />,
      ]}
      thisMenu="requestsFromNotifications"
    />
  )
}
