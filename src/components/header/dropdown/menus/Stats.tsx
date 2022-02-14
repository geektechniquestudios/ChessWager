import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"
import { StaticDropdownItem } from "../StaticDropdownItem"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"

export const Stats: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem goToMenu="profile" leftIcon={<BiArrowBack />} key={0}>
            <h2>Help</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1} />,
          <StaticDropdownItem>
            {/* @todo get from firebase  */}
            Follow Through: {}
          </StaticDropdownItem>,
          <StaticDropdownItem key={2}>Number of Bets</StaticDropdownItem>,
          <StaticDropdownItem key={3}>Net Profit</StaticDropdownItem>,
        ]}
        thisMenu={"stats"}
      />
    </>
  )
}
