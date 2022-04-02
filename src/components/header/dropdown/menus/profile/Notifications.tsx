import { DropdownArea } from "../../DropdownArea"
import { Menu } from "../../Menu"
import { NotificationsList } from "../../areas/NotificationsList"
import { DropdownTop } from "../../DropdownTop"

export const Notifications: React.FC = () => {
  return (
    <Menu
      menuItems={[<DropdownArea key={2} content={<NotificationsList />} />]}
      thisMenu={"notifications"}
    />
  )
}
