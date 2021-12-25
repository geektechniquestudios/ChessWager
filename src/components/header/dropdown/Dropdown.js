/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../style/dropdown.scss"
import { Auth } from "../../containers/Auth"

import { useState, useEffect, useRef } from "react"

import { Main } from "./menus/Main"
import { Settings } from "./menus/Settings"
import { Social } from "./menus/Social"
import { Help } from "./menus/Help"
import { Profile } from "./menus/Profile"
import { BiArrowBack, BiUserCircle } from "react-icons/bi"
import { Menu } from "./Menu"
import { DropdownItem } from "./DropdownItem"

export function Dropdown({ setIsDarkOn, isDarkOn }) {
  const { user, auth } = Auth.useContainer()
  const { photoURL } = auth.currentUser || { uid: "", photoURL: "" }

  return (
    <UserIconButton
      icon={
        user ? (
          <img src={photoURL} alt="" className="user-img" />
        ) : (
          <BiUserCircle className="w-8 h-8" />
        )
      }
    >
      <DropdownMenu setIsDarkOn={setIsDarkOn} isDarkOn={isDarkOn} />
    </UserIconButton>
  )
}

const UserIconButton = ({ icon, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <a href="#" className="dropdown-button" onClick={() => setOpen(!open)}>
        {icon}
      </a>
      {open && children}
    </>
  )
}

const DropdownMenu = ({ setIsDarkOn, isDarkOn }) => {
  const [activeMenu, setActiveMenu] = useState("main")
  const [menuHeight, setMenuHeight] = useState()
  const dropdownRef = useRef(null)
  const { user } = Auth.useContainer()

  const heightMultiplier = 1.1
  useEffect(() => {
    setMenuHeight(
      dropdownRef.current?.firstChild.offsetHeight * heightMultiplier,
    )
  }, [user])

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <Main
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setMenuHeight={setMenuHeight}
        setIsDarkOn={setIsDarkOn}
        isDarkOn={isDarkOn}
      />
      
      <Profile
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setMenuHeight={setMenuHeight}
      />

      <Settings
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setMenuHeight={setMenuHeight}
      />

      <Social
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setMenuHeight={setMenuHeight}
      />

      <Help
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setMenuHeight={setMenuHeight}
      />
    </div>
  )
}
