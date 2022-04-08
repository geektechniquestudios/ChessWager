import { DropdownArea } from "../../../models/DropdownArea"
import { FollowingList } from "../../following/FollowingList"
import { Menu } from "../../../models/Menu"

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
