import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { UserData } from "../../persona/UserData"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"

interface Props {}

export const ClickedFromBets: React.FC<Props> = ({}) => {
  const { clickedUser } = UserMenuState.useContainer()

  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="bet"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Bet"
        />,
        <MenuLine key={1} />,
        <UserData key={2} {...clickedUser} activeMenu="clickedFromBets" />,
      ]}
      thisMenu={"clickedFromBets"}
    />
  )
}
