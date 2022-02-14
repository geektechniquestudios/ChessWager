import { useState } from "react"
import { createContainer } from "unstated-next"

const useDropdownState = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("main")
  const [menuHeight, setMenuHeight] = useState<number>()

  const heightMultiplier = 1.1

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    activeMenu,
    setActiveMenu,
    heightMultiplier,
    menuHeight,
    setMenuHeight,
  }
}

export const DropdownState = createContainer(useDropdownState)
