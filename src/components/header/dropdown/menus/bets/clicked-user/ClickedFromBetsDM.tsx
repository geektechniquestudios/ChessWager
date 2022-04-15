import { BiArrowBack } from "react-icons/bi"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"
import { ConversationData } from "../../messages/ConversationData"

interface Props {}

export const ClickedFromBetsDM: React.FC<Props> = ({}) => {
  const { clickedUser } = UserMenuState.useContainer()

  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="clickedUser"
          leftIcon={<BiArrowBack />}
          key={0}
          text={clickedUser?.displayName ?? ""}
        />,
        <MenuLine key={1} />,
        <ConversationData key={2} />,
      ]}
      thisMenu={"clickedFromBetsDirectMessage"}
    />
  )
}
