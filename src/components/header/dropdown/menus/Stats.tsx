import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { useState, useEffect, useRef } from "react"
import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
import Toggle from "react-toggle"
import firebase from "firebase/compat"

import { ReactComponent as BellIcon } from "./icons/bell.svg"
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg"
import { ReactComponent as CaretIcon } from "./icons/caret.svg"
import { ReactComponent as PlusIcon } from "./icons/plus.svg"
import { ReactComponent as CogIcon } from "./icons/cog.svg"
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg"
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg"
import { ReactComponent as BoltIcon } from "../icons/bolt.svg"
import { StaticDropdownItem } from "../StaticDropdownItem"
import { CgProfile } from "react-icons/cg"
import { RiSettings5Line } from "react-icons/ri"
import { BsShare } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
}

export const Stats: React.FC<Props> = ({
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
            goToMenu="profile"
            leftIcon={<BiArrowBack />}
            setActiveMenu={setActiveMenu}
            key={0}
          >
            <h2>Help</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1}> </div>,
          <StaticDropdownItem>
            {/* @todo get from firebase  */}
            Follow Through: {}
          </StaticDropdownItem>,
          <StaticDropdownItem key={2}>Number of Bets</StaticDropdownItem>,
          <StaticDropdownItem key={3}>Net Profit</StaticDropdownItem>,
        ]}
        thisMenu={"stats"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
