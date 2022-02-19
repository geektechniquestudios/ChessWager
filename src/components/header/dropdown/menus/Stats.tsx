import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"
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
          <DropdownItem>
            {/* @todo get from firebase  */}
            Follow Through: {}
          </DropdownItem>,
          <DropdownItem key={2}>Number of Bets</DropdownItem>,
          <DropdownItem key={3}>Net Profit</DropdownItem>,
        ]}
        thisMenu={"stats"}
      />
    </>
  )
}
