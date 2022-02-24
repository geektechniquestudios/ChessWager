import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"

export const Notifications: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="profile"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Notifications"
        />,
        <div className="border-b-2" key={1} />,
      ]}
      thisMenu={"notifications"}
    />
  )
}
