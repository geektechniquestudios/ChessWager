import { BiArrowBack } from "react-icons/bi"
import { DropdownArea } from "../../DropdownArea"
import { DropdownItem } from "../../DropdownItem"
import { FollowingList } from "../following/FollowingList"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"

export const Following: React.FC = ({}) => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="profile"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Following"
          />,
          <MenuLine key={1} />,
          <DropdownArea key={2} content={<FollowingList />} />,
        ]}
        thisMenu={"following"}
      />
    </>
  )
}
