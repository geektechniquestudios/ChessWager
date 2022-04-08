import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"

interface Props {}

export const ClickedReportMenu: React.FC<Props> = ({}) => {
  const { clickedUser } = UserMenuState.useContainer()

  return <Menu
    menuItems={[
      <DropdownItem
        goToMenu="clickedUser"
        leftIcon={<BiArrowBack />}
        key={0}
        text={clickedUser?.displayName ?? ""}
      />,
      <MenuLine key={1} />,
      <div key={2}>test</div>
    ]} 
    thisMenu={'clickedUserReport'}
  />
}