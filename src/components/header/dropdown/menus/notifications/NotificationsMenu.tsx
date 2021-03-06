import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { NotificationsList } from "./NotificationsList"

export const NotificationsMenu: React.FC = () => {
  return (
    <Menu
      menuItems={[<DropdownArea content={<NotificationsList />} />]}
      thisMenu={"notifications"}
    />
  )
}
