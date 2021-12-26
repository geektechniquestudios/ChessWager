import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { useState } from "react"
import { DropdownItem } from "../DropdownItem"
import Toggle from "react-toggle"

import { StaticDropdownItem } from "../StaticDropdownItem"
import { RiChatDeleteLine } from "react-icons/ri"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { MdOutlineBlock } from "react-icons/md"
import { GoUnmute } from "react-icons/go"
import { ImVolumeMute2 } from "react-icons/im"
import { BsSuitClub } from "react-icons/bs"
import { SiOpenbadges } from "react-icons/si"
import { GiMonkey } from "react-icons/gi"
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
          >
            <h2>store</h2>
          </DropdownItem>,
          <div className="border-b-2" />,

          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<BsSuitClub />}
            goToMenu="blocked"
          >
            membership
          </DropdownItem>,
          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<SiOpenbadges />}
            goToMenu="blocked"
          >
            badges
          </DropdownItem>,

          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<GiMonkey />}
            goToMenu="blocked"
          >
            nfts
          </DropdownItem>,
        ]}
        thisMenu={"store"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
