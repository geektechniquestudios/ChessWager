import { useEffect, useRef } from "react"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { Achievements } from "./menus/profile/Achievements"
import { BlockedUsers } from "./menus/settings/BlockedUsers"
import { DirectMessage } from "./menus/search/DirectMessage"
import { Contact } from "./menus/help/Contact"
import { DisplayName } from "./menus/profile/DisplayName"
import { Faq } from "./menus/help/Faq"
import { Help } from "./menus/main/Help"
import { HowToPlay } from "./menus/help/HowToPlay"
import { Leaderboard } from "./menus/main/Leaderboard"
import { Main } from "./menus/Main"
import { Membership } from "./menus/store/Membership"
import { Messages } from "./menus/profile/Messages"
import { Notifications } from "./menus/profile/Notifications"
import { Profile } from "./menus/main/Profile"
import { Report } from "./menus/search/Report"
import { SearchUsers } from "./menus/main/SearchUsers"
import { Settings } from "./menus/main/Settings"
import { Social } from "./menus/main/Social"
import { Stats } from "./menus/profile/Stats"
import { Store } from "./menus/main/Store"
import { SearchedUserMenu } from "./menus/search/SearchedUserMenu"
import { Persona } from "./menus/profile/Persona"
import { ClickedUser } from "./menus/ClickedUser"
import { UserMenuState } from "../../containers/UserMenuState"
import { Conversation } from "./menus/messages/Conversation"
import { Following } from "./menus/profile/Following"
import { BetsMenu } from "./menus/profile/BetsMenu"
import { DarkMode } from "../../containers/DarkMode"

export const DropdownMenu = () => {
  const CloseMenuListener = (ref: React.MutableRefObject<any>) => {
    const { setIsDropdownOpen, setActiveMenu } = DropdownState.useContainer()
    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        if (ref.current?.contains(event.target)) {
          return
        }
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDropdownOpen(false)
          setActiveMenu("")
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

  const { clickedUserId } = UserMenuState.useContainer()
  const { isDarkOn } = DarkMode.useContainer()
  const bgColor = isDarkOn
    ? "rgba(68, 64, 60, 0.60)"
    : "rgba(245, 245, 244, 0.60)"
  const blur = isDarkOn ? "blur(18px)" : "blur(16px)"

  const firefoxColors = (): string =>
    "bg-stone-100 dark:bg-stone-700 border-2 border-stone-400 dark:border-stone-500"

  return (
    <div
      className={`${firefoxColors} dropdown absolute w-64 text-stone-800 dark:text-stone-200 overflow-hidden right-5 top-10 z-50 rounded-md shadow-lg border border-stone-400  dark:border-stone-500`}
      style={{
        height: menuHeight,
        // background: bgColor,
        backdropFilter: blur,
      }}
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
        {user && <BlockedUsers />}
        {user && <Messages />}
        {user && <Following />}
        {user && <Notifications />}
        <SearchedUserMenu />
        <SearchUsers />
        {user && <DisplayName />}
        {user && <Achievements />}
        {user && <Stats />}
        {user && <Membership />}
        {user && <DirectMessage />}
        {user && <Report />}
        <HowToPlay />
        <Faq />
        <Contact />
        {user && <Persona />}
        {clickedUserId !== "" && user && <ClickedUser />}
        {user && <Conversation />}
        {user && <BetsMenu />}
      </div>
    </div>
  )
}
