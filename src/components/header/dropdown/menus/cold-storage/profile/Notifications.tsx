import { DropdownArea } from "../../../models/DropdownArea"
import { Menu } from "../../../models/Menu"
import { NotificationsList } from "../../notifications/NotificationsList"

export const Notifications: React.FC = () => {
  return (
    <Menu
      menuItems={[<DropdownArea key={2} content={<NotificationsList />} />]}
      thisMenu={"notifications"}
    />
  )
}
