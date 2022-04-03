import { DropdownArea } from "../../DropdownArea"
import { FollowingList } from "../following/FollowingList"
import { Menu } from "../../Menu"

export const Following: React.FC = ({}) => {
  return (
    <>
      <Menu
        menuItems={[<DropdownArea key={2} content={<FollowingList />} />]}
        thisMenu={"following"}
      />
    </>
  )
}
