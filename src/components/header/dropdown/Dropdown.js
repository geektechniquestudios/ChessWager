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

// Don't try to make this into a typescript file. If you can get it to work, be my guest, but glhf.

export const Dropdown = ({
  setIsDarkOn,
  isDarkOn,
  open,
  setOpen,
  activeMenu,
  setActiveMenu,
}) => {
  const { user, auth } = Auth.useContainer()
  const { photoURL } = auth.currentUser || { uid: "", photoURL: "" }
  const [shouldMenuStayOpen, setShouldMenuStayOpen] = useState(false)

  return (
    <UserIconButton
      open={open}
      setOpen={setOpen}
      shouldMenuStayOpen={shouldMenuStayOpen}
      setActiveMenu={setActiveMenu}
      icon={
        user ? (
          <img
            src={photoURL}
            alt=""
            className="user-img rounded-full hover:border-teal-800 border-black border-1"
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
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
    </UserIconButton>
  )
}

const UserIconButton = ({ icon, children, open, setOpen, setActiveMenu }) => {
  const pointerEvents = open ? "pointer-events-none" : ""
  return (
    <>
      <a
        href="#"
        className={`flex w-8 h-8 m-2 align-middle rounded-full bg-secondary dark:bg-secondary-dark hover:bg-stone-500 dark:hover:bg-stone-600 ${pointerEvents}`}
        onClick={() => {
          setActiveMenu("main")
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
  activeMenu,
  setActiveMenu,
}) => {
  const [menuHeight, setMenuHeight] = useState()
  const { user } = Auth.useContainer()
  const dropdownRef = useRef(null)
  CloseMenuListener(dropdownRef, setOpen, shouldMenuStayOpen)

  const heightMultiplier = 1.1
  useEffect(() => {
    if (user) {
      setMenuHeight(515)
    } else {
      setMenuHeight(325)
    }
    activeMenu === "settings" && setMenuHeight(
      dropdownRef.current?.firstChild.offsetHeight * heightMultiplier,
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
