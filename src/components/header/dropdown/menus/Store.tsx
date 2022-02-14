import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"

import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { BsSuitClub } from "react-icons/bs"
import { SiOpenbadges } from "react-icons/si"
import { GiMonkey } from "react-icons/gi"
import { RiShirtLine } from "react-icons/ri"
// import { GiPoliceBadge } from "react-icons/gi"

export const Store: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem goToMenu="main" leftIcon={<BiArrowBack />} key={0}>
            <h2>Store</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1} />,

          <DropdownItem leftIcon={<BsSuitClub />} goToMenu="blocked" key={2}>
            Membership
          </DropdownItem>,

          <DropdownItem leftIcon={<SiOpenbadges />} goToMenu="blocked" key={3}>
            Badges
          </DropdownItem>,

          <DropdownItem leftIcon={<GiMonkey />} goToMenu="blocked" key={4}>
            NFTs
          </DropdownItem>,

          <DropdownItem leftIcon={<RiShirtLine />} goToMenu="blocked" key={5}>
            Merch
          </DropdownItem>,
        ]}
        thisMenu={"store"}
      />
    </>
  )
}
