import { useRef, useState } from "react"
import { createContainer } from "unstated-next"

const useDropdownState = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("main")
  const [menuHeight, setMenuHeight] = useState<number>()

  const dropdownRef = useRef(null)

  const heightMultiplier = 1.1

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    activeMenu,
    setActiveMenu,
    heightMultiplier,
    menuHeight,
    setMenuHeight,
    dropdownRef,
  }
}

export const DropdownState = createContainer(useDropdownState)
