import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"
import { FollowersList } from "./FollowersList"

interface Props {}

export const FollowersMenu: React.FC<Props> = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="persona"
          key={0}
          text="Followers"
          leftIcon={<BiArrowBack />}
        />,
        <MenuLine key={1} />,
        <FollowersList key={2} />,
      ]}
      thisMenu="followers"
    />
  )
}
