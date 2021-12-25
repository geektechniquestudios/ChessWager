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
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg"
import { ReactComponent as BoltIcon } from "./icons/bolt.svg"
import { StaticDropdownItem } from "../StaticDropdownItem"
import { CgProfile } from "react-icons/cg"
import { RiSettings5Line } from "react-icons/ri"
import { BsShare } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { GiWallet } from "react-icons/gi"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  setIsDarkOn: React.Dispatch<React.SetStateAction<boolean>>
  isDarkOn: boolean
  heightMultiplier: number
}

export const Main: React.FC<Props> = ({
  activeMenu,
  setActiveMenu,
  setMenuHeight,
  setIsDarkOn,
  isDarkOn,
  heightMultiplier,
}) => {
  const userDocumentRef = firebase.firestore().collection("users")
  const {
    user,
    signOutWithGoogle,
    signInWithGoogle,
    connectWallet,
    isWalletConnected,
    disconnectWallet,
  } = Auth.useContainer()

  const updateUserDarkPref = (isChecked: boolean) => {
    if (user?.uid) {
      const userRef = userDocumentRef.doc(user.uid)
      userRef.update({
        darkMode: isChecked,
      })
    }
    localStorage.setItem("darkMode", isChecked.toString())
  }

  const calcHeight = (el: any) => {
    const height = el.offsetHeight * heightMultiplier
    setMenuHeight(height)
  }
  return (
    <>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          {user && (
            <DropdownItem
              leftIcon={<CgProfile />}
              goToMenu="profile"
              setActiveMenu={setActiveMenu}
            >
              profile
            </DropdownItem>
          )}
          {user && (
            <DropdownItem
              leftIcon={<RiSettings5Line />}
              goToMenu="settings"
              setActiveMenu={setActiveMenu}
            >
              settings
            </DropdownItem>
          )}
          <DropdownItem
            leftIcon={<BsShare />}
            goToMenu="social"
            setActiveMenu={setActiveMenu}
          >
            social
          </DropdownItem>
          <DropdownItem
            leftIcon={<BiHelpCircle />}
            goToMenu="help"
            setActiveMenu={setActiveMenu}
          >
            help
          </DropdownItem>
          <StaticDropdownItem
            clickAction={() => {
              setIsDarkOn(!isDarkOn)
              updateUserDarkPref(!isDarkOn)
            }}
          >
            <Toggle
              onChange={(e) => {
                const isChecked = e.target.checked
                setIsDarkOn(isChecked)
                updateUserDarkPref(isChecked)
              }}
              checked={isDarkOn}
            />
          </StaticDropdownItem>
          {!isWalletConnected && (
            <StaticDropdownItem
              clickAction={connectWallet}
              leftIcon={<GiWallet />}
            >
              connect wallet
            </StaticDropdownItem>
          )}
          {isWalletConnected && (
            <StaticDropdownItem
              clickAction={disconnectWallet}
              leftIcon={<GiWallet />}
            >
              disconnect wallet
            </StaticDropdownItem>
          )}
          {!user && (
            <StaticDropdownItem
              clickAction={signInWithGoogle}
              leftIcon={<RiLogoutCircleRLine />}
            >
              log in
            </StaticDropdownItem>
          )}
          {user && (
            <StaticDropdownItem
              clickAction={signOutWithGoogle}
              leftIcon={<RiLogoutCircleRLine />}
            >
              log out
            </StaticDropdownItem>
          )}
        </div>
      </CSSTransition>
    </>
  )
}
