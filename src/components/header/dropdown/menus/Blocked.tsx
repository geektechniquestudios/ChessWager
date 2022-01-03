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
import { BsArrowLeft, BsShare } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"

const firestore = firebase.firestore()

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
}

export const Blocked: React.FC<Props> = ({
  activeMenu,
  setActiveMenu,
  setMenuHeight,
  heightMultiplier,
}) => {
  // const { user } = Auth.useContainer()
  // const [blocked, setBlocked] = useState(undefined)
  // if (user) {
  //   const blockedUsers = firestore
  //     .collection("users")
  //     .doc(user!.uid)
  //     .get()
  //     .then((doc) => doc.data()?.blocked)
  //   blockedUsers.then((users) =>
  //     setBlocked(
  //       users.map((user: string[]) => (
  //         <StaticDropdownItem>{user ?? "no blocked users"}</StaticDropdownItem>
  //       )),
  //     ),
  //   )
  // }
  return (
    <>
      <Menu
        menuItems={[
            <DropdownItem
              setActiveMenu={setActiveMenu}
              leftIcon={<BsArrowLeft />}
              goToMenu="settings"
              key={0}
            >
              Blocked Users
            </DropdownItem>
          ,
        ]}
        thisMenu={"blocked"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
