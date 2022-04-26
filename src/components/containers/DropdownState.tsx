import { useState } from "react"
import { createContainer } from "unstated-next"
import { Bet } from "../../interfaces/Bet"

const useDropdownState = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("")
  const [menuHeight, setMenuHeight] = useState(0)
  const [bet, setBet] = useState<Bet | null>(null)
  const [menuStack, setMenuStack] = useState<string[]>([])

  const openDropdownToMenu = (menu: string) => {
    setActiveMenu(menu)
    setIsDropdownOpen(true)
  }

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    activeMenu,
    setActiveMenu,
    menuHeight,
    setMenuHeight,
    openDropdownToMenu,
    bet,
    setBet,
    menuStack,
    setMenuStack,
  }
}

export const DropdownState = createContainer(useDropdownState)
