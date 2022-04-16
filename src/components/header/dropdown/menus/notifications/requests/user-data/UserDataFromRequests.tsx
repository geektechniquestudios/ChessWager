import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../../../../containers/UserMenuState"
import { DropdownItem } from "../../../../models/DropdownItem"
import { Menu } from "../../../../models/Menu"
import { MenuLine } from "../../../../models/MenuLine"
import { UserData } from "../../../persona/UserData"

interface Props {}

export const UserDataFromRequests: React.FC<Props> = ({}) => {
  const { clickedUser } = UserMenuState.useContainer()
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="requests"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Requests"
        />,
        <MenuLine key={1} />,
        <UserData key={2} {...clickedUser} activeMenu="userDataFromRequests" />,
      ]}
      thisMenu="userDataFromRequests"
    />
  )
}
