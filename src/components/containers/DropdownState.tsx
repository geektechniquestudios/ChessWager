import { useState } from "react"
import { createContainer } from "unstated-next"

const useDropdownState = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("main")
  const [menuHeight, setMenuHeight] = useState(0)

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    activeMenu,
    setActiveMenu,
    menuHeight,
    setMenuHeight,
  }
}

export const DropdownState = createContainer(useDropdownState)
