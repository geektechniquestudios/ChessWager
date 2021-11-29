import { useState } from "react"
import "../../../style/header.scss"

interface Props {
  msg: string
  children: React.ReactNode
}

export const NavItem: React.FC<Props> = ({ msg, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <li className="nav-item color-shift">
      <a
        href="#"
        className="icon-button color-shift"
        onClick={() => setOpen(!open)}
      >
        {msg}
      </a>

      {open && children}
    </li>
  )
}
