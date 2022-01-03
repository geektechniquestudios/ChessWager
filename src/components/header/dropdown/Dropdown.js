/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../style/dropdown.scss"
import { Auth } from "../../containers/Auth"

import { useState, useEffect, useRef } from "react"

import { Main } from "./menus/Main"
import { Settings } from "./menus/Settings"
import { Social } from "./menus/Social"
import { Help } from "./menus/Help"
import { Profile } from "./menus/Profile"
import { BiUserCircle } from "react-icons/bi"
import { Blocked } from "./menus/Blocked"
import { Store } from "./menus/Store"

export const Dropdown = ({ setIsDarkOn, isDarkOn }) => {
  const { user, auth } = Auth.useContainer()
  const { photoURL } = auth.currentUser || { uid: "", photoURL: "" }
  const [open, setOpen] = useState(false)
  const [shouldMenuStayOpen, setShouldMenuStayOpen] = useState(false)

  return (
    <UserIconButton
      open={open}
      setOpen={setOpen}
      shouldMenuStayOpen={shouldMenuStayOpen}
      icon={
        user ? (
          <img
            src={photoURL}
            alt=""
            className="user-img rounded-full hover:border-tertiary-dark border-black"
          />
        ) : (
          <BiUserCircle className="w-8 h-8" />
        )
      }
    >
      <DropdownMenu
        setIsDarkOn={setIsDarkOn}
        isDarkOn={isDarkOn}
        setOpen={setOpen}
        open={open}
      />
    </UserIconButton>
  )
}

const UserIconButton = ({
  icon,
  children,
  open,
  setOpen,
}) => {
  const pointerEvents = open ? "pointer-events-none" : ""
  return (
    <>
      <a
        href="#"
        className={`dropdown-button ${pointerEvents}`}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {icon}
      </a>
      {open && children}
    </>
  )
}

const CloseMenuListener = (ref, setOpen, shouldMenuStayOpen, open) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if user clicks on the user icon, don't close the menu
      if (ref.current?.contains(event.target)) {
        return
      }
      if (ref.current && !ref.current.contains(event.target)) {
        shouldMenuStayOpen ? console.log("") : setOpen(false) // make menu pulse to show it's still open
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, ref, setOpen, shouldMenuStayOpen])
}

const DropdownMenu = ({
  setIsDarkOn,
  isDarkOn,
  setOpen,
  open,
  shouldMenuStayOpen,
}) => {
  const [activeMenu, setActiveMenu] = useState("main")
  const [menuHeight, setMenuHeight] = useState()
  const { user } = Auth.useContainer()
  const dropdownRef = useRef(null)
  CloseMenuListener(dropdownRef, setOpen, shouldMenuStayOpen)

  const heightMultiplier = 1.1
  useEffect(() => {
    // setMenuHeight(
    //   dropdownRef.current?.firstChild.offsetHeight * heightMultiplier,
    // )
    if (user) {
      setMenuHeight(515)
    } else {
      setMenuHeight(325)
    }
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
        dropdownRef={dropdownRef}
      />

      {user && (
        <Profile
          heightMultiplier={heightMultiplier}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setMenuHeight={setMenuHeight}
        />
      )}

      {user && (
        <Settings
          heightMultiplier={heightMultiplier}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setMenuHeight={setMenuHeight}
        />
      )}

      {user && (
        <Store
          heightMultiplier={heightMultiplier}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setMenuHeight={setMenuHeight}
        />
      )}

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

      {user && (
        <Blocked
          heightMultiplier={heightMultiplier}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setMenuHeight={setMenuHeight}
        />
      )}
    </div>
  )
}
