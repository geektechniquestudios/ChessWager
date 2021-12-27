import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"

import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { BsSuitClub } from "react-icons/bs"
import { SiOpenbadges } from "react-icons/si"
import { GiMonkey } from "react-icons/gi"
import {RiShirtLine} from "react-icons/ri"
// import { GiPoliceBadge } from "react-icons/gi"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
}

export const Store: React.FC<Props> = ({
  activeMenu,
  setActiveMenu,
  setMenuHeight,
  heightMultiplier,
}) => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            setActiveMenu={setActiveMenu}
            key={0}
          >
            <h2>store</h2>
          </DropdownItem>,
          <div className="border-b-2"  key={1}/>,

          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<BsSuitClub />}
            goToMenu="blocked"
            key={2}
          >
            membership
          </DropdownItem>,
          
          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<SiOpenbadges />}
            goToMenu="blocked"
            key={3}
          >
            badges
          </DropdownItem>,

          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<GiMonkey />}
            goToMenu="blocked"
            key={4}
          >
            nfts
          </DropdownItem>,

          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<RiShirtLine />}
            goToMenu="blocked"
            key={5}>
              merch
            </DropdownItem>
        ]}
        thisMenu={"store"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
