import { DropdownArea } from "../../models/DropdownArea"
import { FollowingList } from "./FollowingList"
import { Menu } from "../../models/Menu"
import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../models/DropdownItem"
import { MenuLine } from "../../models/MenuLine"

export const FollowingMenu: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="persona"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Following"
        />,
        <MenuLine key={1} />,
        <DropdownArea key={2} content={<FollowingList />} />,
      ]}
      thisMenu={"following"}
    />
  )
}
