import { useEffect, useRef } from "react"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { Blocked } from "./menus/Blocked"
import { Friends } from "./menus/Friends"
import { Help } from "./menus/Help"
import { Main } from "./menus/Main"
import { Messages } from "./menus/Messages"
import { Profile } from "./menus/Profile"
import { Settings } from "./menus/Settings"
import { Social } from "./menus/Social"
import { Store } from "./menus/Store"

const CloseMenuListener = (ref: any) => {
  const { setIsDropdownOpen } = DropdownState.useContainer()
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current?.contains(event.target)) {
        return
      }
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, setIsDropdownOpen])
}

export const DropdownMenu = () => {
  const dropdownRef = useRef<any>()

  const { user } = Auth.useContainer()
  const { menuHeight, setMenuHeight, activeMenu, heightMultiplier } = DropdownState.useContainer()

  CloseMenuListener(dropdownRef)

  useEffect(() => {
    if (user) {
      setMenuHeight(515)
    } else {
      setMenuHeight(325)
    }
    // activeMenu === "settings" &&
    //   setMenuHeight(
    //     dropdownRef.current?.firstChild.offsetHeight * heightMultiplier,
    //   )
  }, [setMenuHeight, user])

  return (
    <div
      className="dropdown absolute w-64 -translate-x-1/2 bg-stone-100 dark:bg-stone-700 border-2 border-secondary-dark text-stone-800 dark:text-stone-200 p-4 overflow-hidden right-2 top-10 z-50 rounded-md align-middle justify-center flex shadow-2xl"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <Main />
      {user && <Profile />}
      {user && <Settings />}
      {user && <Store />}
      <Social />
      <Help />
      {user && <Blocked />}
      {user && <Messages />}
      {user && <Friends />}
    </div>
  )
}
