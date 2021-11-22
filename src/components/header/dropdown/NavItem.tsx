import { useState } from "react"

interface Props {
  msg: string
}

export const NavItem: React.FC<Props> = ({ msg }) => {
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

      {open && msg}
    </li>
  )
}
