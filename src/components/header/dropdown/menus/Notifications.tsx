import { BiArrowBack } from "react-icons/bi"
import { DropdownArea } from "../DropdownArea"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"
import "../../../../style/scrollbar.scss"
import { NotificationsList } from "../areas/NotificationsList"

export const Notifications: React.FC = () => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="profile"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Notifications"
        />,
        <MenuLine key={1} />,
        <DropdownArea key={2} content={<NotificationsList />} />,
      ]}
      thisMenu={"notifications"}
    />
  )
}
