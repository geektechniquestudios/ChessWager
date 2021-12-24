import "../../../style/dropdown.scss"
import { Auth } from "../../containers/Auth"

import { useState, useEffect, useRef } from "react"
import { DropdownItem } from "./DropdownItem"
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
import { StaticDropdownItem } from "./StaticDropdownItem"

export function Dropdown({setIsDarkOn, isDarkOn}) {
  const { auth } = Auth.useContainer()
  const { uid, photoURL } = auth.currentUser || { uid: "", photoURL: "" }

  return (
    <UserIconButton icon={<img src={photoURL} alt="" className="user-img" />}>
      <DropdownMenu setIsDarkOn={setIsDarkOn} isDarkOn={isDarkOn}></DropdownMenu>
    </UserIconButton>
  )
}

function UserIconButton(props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </>
  )
}

function DropdownMenu({setIsDarkOn, isDarkOn}) {
  const [activeMenu, setActiveMenu] = useState("main")
  const [menuHeight, setMenuHeight] = useState()
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight * 1.2)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight * 1.2
    setMenuHeight(height)
  }
  const { user } = Auth.useContainer()

  const userDocumentRef = firebase.firestore().collection("users")

  const updateUserDarkPref = (isChecked) => {
    if (user.uid) {
      const userRef = userDocumentRef.doc(user.uid)
      userRef.update({
        darkMode: isChecked,
      })
    }
    localStorage.setItem("darkMode", isChecked.toString())
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
            setActiveMenu={setActiveMenu}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals"
            setActiveMenu={setActiveMenu}
          >
            Animals
          </DropdownItem>
          <StaticDropdownItem>
            <Toggle
              onChange={(e) => {
                const isChecked = e.target.checked
                setIsDarkOn(isChecked)
                updateUserDarkPref(isChecked)
              }}
              checked={isDarkOn}
            />
          </StaticDropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            goToMenu="main"
            leftIcon={<ArrowIcon />}
            setActiveMenu={setActiveMenu}
          >
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} setActiveMenu={setActiveMenu}>
            HTML
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} setActiveMenu={setActiveMenu}>
            CSS
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} setActiveMenu={setActiveMenu}>
            JavaScript
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} setActiveMenu={setActiveMenu}>
            Awesome!
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === ""}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            goToMenu="main"
            leftIcon={<ArrowIcon />}
            setActiveMenu={setActiveMenu}
          >
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘" setActiveMenu={setActiveMenu}>
            Kangaroo
          </DropdownItem>
          <DropdownItem leftIcon="🐸" setActiveMenu={setActiveMenu}>
            Frog
          </DropdownItem>
          <DropdownItem leftIcon="🦋" setActiveMenu={setActiveMenu}>
            Horse?
          </DropdownItem>
          <DropdownItem leftIcon="🦔" setActiveMenu={setActiveMenu}>
            Hedgehog
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}
