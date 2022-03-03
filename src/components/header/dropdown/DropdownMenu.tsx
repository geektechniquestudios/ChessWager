import { useEffect, useRef } from "react"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { Achievements } from "./menus/Achievements"
import { Blocked } from "./menus/Blocked"
import { DirectMessage } from "./menus/DirectMessage"
import { DisplayName } from "./menus/DisplayName"
import { Friends } from "./menus/Friends"
import { Help } from "./menus/Help"
import { Leaderboard } from "./menus/Leaderboard"
import { Main } from "./menus/Main"
import { Membership } from "./menus/Membership"
import { Messages } from "./menus/Messages"
import { Notifications } from "./menus/Notifications"
import { Profile } from "./menus/Profile"
import { Report } from "./menus/Report"
import { SearchUsers } from "./menus/SearchUsers"
import { Settings } from "./menus/Settings"
import { Social } from "./menus/Social"
import { Stats } from "./menus/Stats"
import { Store } from "./menus/Store"
import { UserMenu } from "./menus/UserMenu"

export const DropdownMenu = () => {
  const CloseMenuListener = (ref: React.MutableRefObject<any>) => {
    const { setIsDropdownOpen } = DropdownState.useContainer()
    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        if (ref.current?.contains(event.target)) {
          return
        }
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDropdownOpen(false)
          setMenuHeight(0)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref, setIsDropdownOpen])
  }
  const dropdownRef = useRef<any>()

  const { user } = Auth.useContainer()
  const { menuHeight, setMenuHeight } = DropdownState.useContainer()

  CloseMenuListener(dropdownRef)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [setMenuHeight])

  return (
    <div
      className="dropdown absolute w-64 bg-stone-100 dark:bg-stone-700 border-2 border-stone-400 dark:border-stone-500 text-stone-800 dark:text-stone-200 overflow-hidden right-5 top-10 z-50 rounded-md shadow-2xl"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <div className="flex justify-center">
        <Main />
        {user && <Profile />}
        {user && <Settings />}
        {user && <Store />}
        <Social />
        <Leaderboard />
        <Help />
        {user && <Blocked />}
        {user && <Messages />}
        {user && <Friends />}
        {user && <Notifications />}
        <UserMenu />
        <SearchUsers />
        {user && <DisplayName />}
        {user && <Achievements />}
        {user && <Stats />}
        {user && <Membership />}
        {user && <DirectMessage />}
        {user && <Report />}
      </div>
    </div>
  )
}
