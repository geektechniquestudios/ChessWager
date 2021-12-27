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
import { BiHelpCircle, BiMessageRoundedError } from "react-icons/bi"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
}

export const Help: React.FC<Props> = ({
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
            <h2>help</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1}>
            {" "}
          </div>,
          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<AiOutlineQuestionCircle />}
            key={2}
          >
            how to play
          </DropdownItem>,
          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<AiOutlineInfoCircle />}
            key={3}
          >
            faqs
          </DropdownItem>,
          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<BiMessageRoundedError />}
            key={4}
          >
            contact us
          </DropdownItem>,
        ]}
        thisMenu={"help"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
