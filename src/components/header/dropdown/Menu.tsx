import { DropdownItem } from "./DropdownItem"
//@ts-ignore
import { CSSTransition } from "react-transition-group"
import { useState } from "react"
import "../../../style/header.scss"

export const Menu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("main")

  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        className="menu-primary"
      >
        <div className="menu">
          <DropdownItem leftIcon="🔒">Privacy</DropdownItem>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem rightIcon="🚪">Logout</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}
