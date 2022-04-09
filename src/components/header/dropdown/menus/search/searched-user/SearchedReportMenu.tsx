import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { DropdownArea } from "../../../models/DropdownArea"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"
import { ClickedReportForm } from "../../clicked-user/ClickedReportForm"

interface Props {}

export const SearchedReportMenu: React.FC<Props> = ({}) => {
  const { clickedUser } = UserMenuState.useContainer()

  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="searchedUser"
          leftIcon={<BiArrowBack />}
          key={0}
          text={clickedUser?.displayName ?? ""}
        />,
        <MenuLine key={1} />,
        <DropdownArea key={2} content={<ClickedReportForm />} />,
      ]}
      thisMenu={"searchedUserReport"}
    />
  )
}
