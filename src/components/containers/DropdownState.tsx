import { RefObject, useState } from "react"
import { createContainer } from "unstated-next"
import { Bet } from "../../interfaces/Bet"

const useDropdownState = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("")
  const [menuHeight, setMenuHeight] = useState(0)
  const [bet, setBet] = useState<Bet | null>(null)
  const [menuStack, setMenuStack] = useState<string[]>([])
  const [menuRefMap, setMenuRefMap] = useState<
    Map<string, RefObject<HTMLButtonElement>>
  >(new Map())

  const openDropdownToMenu = (menu: string) => {
    setActiveMenu(menu)
    setIsDropdownOpen(true)
    setMenuStack([menu])
  }

  const closeDropdownMenu = () => {
    setIsDropdownOpen(false)
    setActiveMenu("")
    setMenuHeight(0)
    setMenuStack([])
  }

  const goToMenu = (menu: string) => {
    setActiveMenu(menu)
    setMenuStack([...menuStack, menu])
  }

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    closeDropdownMenu,
    activeMenu,
    setActiveMenu,
    menuHeight,
    setMenuHeight,
    openDropdownToMenu,
    bet,
    setBet,
    menuStack,
    setMenuStack,
    goToMenu,
    menuRefMap,
    setMenuRefMap,
  }
}

export const DropdownState = createContainer(useDropdownState)
