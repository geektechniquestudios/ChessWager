import { Menu } from "../../models/Menu"
import { NotificationsList } from "./NotificationsList"

export const NotificationsMenu: React.FC = () => {
  return <Menu menuItems={[<NotificationsList />]} thisMenu={"notifications"} />
}
