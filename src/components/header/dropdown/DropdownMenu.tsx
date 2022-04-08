import { useEffect, useRef } from "react"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { Achievements } from "./menus/cold-storage/profile/Achievements"
import { BlockedUsers } from "./menus/cold-storage/settings/BlockedUsers"
import { SearchedDirectMessageMenu } from "./menus/search/searched-user/SearchedDirectMessageMenu"
import { Contact } from "./menus/help/Contact"
import { DisplayName } from "./menus/cold-storage/profile/DisplayName"
import { Faq } from "./menus/help/Faq"
import { Help } from "./menus/main/Help"
import { HowToPlay } from "./menus/help/HowToPlay"
import { Leaderboard } from "./menus/cold-storage/Leaderboard"
import { Main } from "./menus/Main"
import { Membership } from "./menus/cold-storage/store/Membership"
import { Messages } from "./menus/cold-storage/profile/Messages"
import { Notifications } from "./menus/cold-storage/profile/Notifications"
import { Profile } from "./menus/cold-storage/Profile"
import { Report } from "./menus/persona/ReportMenu"
import { SearchUsersMenu } from "./menus/search/SearchUsersMenu"
import { Settings } from "./menus/main/Settings"
import { Social } from "./menus/main/Social"
import { Stats } from "./menus/cold-storage/profile/Stats"
import { Store } from "./menus/cold-storage/Store"
import { SearchedUserMenu } from "./menus/search/searched-user/SearchedUserMenu"
import { PersonaMenu } from "./menus/persona/PersonaMenu"
import { ClickedUserMenu } from "./menus/clicked-user/ClickedUserMenu"
import { UserMenuState } from "../../containers/UserMenuState"
import { ConversationMenu } from "./menus/messages/ConversationMenu"
import { Following } from "./menus/cold-storage/profile/Following"
import { BetsMenu } from "./menus/bets/BetsMenu"
import { DarkMode } from "../../containers/DarkMode"
import { ClickedDirectMessageMenu } from "./menus/clicked-user/ClickedDirectMessageMenu"
import { BetMenu } from "./menus/bets/BetMenu"
import { ClickedFromBets } from "./menus/bets/clicked-user/ClickedFromBets"
import { ClickedFromBetsDM } from "./menus/bets/clicked-user/ClickedFromBetsDM"

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

  const { clickedUser } = UserMenuState.useContainer()
  const { isDarkOn } = DarkMode.useContainer()
  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1

  const bgColor = !isFirefox
    ? isDarkOn
      ? "rgba(68, 64, 60, 0.79)"
      : "rgba(245, 245, 244, 0.60)"
    : isDarkOn
    ? "rgba(68, 64, 60, 0.99)"
    : "rgba(245, 245, 244, 0.99)"
  const blur = isDarkOn ? "blur(18px)" : "blur(16px)"

  const firefoxColors = (): string => "bg-stone-100 dark:bg-stone-700"

  return (
    <div
      className={`${firefoxColors} dropdown absolute w-64 text-stone-800 dark:text-stone-200 overflow-hidden right-5 top-10 z-50 rounded-md shadow-lg border border-stone-400  dark:border-stone-500`}
      style={{
        height: menuHeight,
        background: bgColor,
        backdropFilter: blur,
      }}
      ref={dropdownRef}
    >
      <div className="flex justify-center">
        <Main />
        {user && <Profile />}
        {/* {user && <Settings />} */}
        {/* {user && <Store />} */}
        <Social />
        {/* <Leaderboard /> */}
        <Help />
        {/* {user && <BlockedUsers />} */}
        {user && <Messages />}
        {user && <Following />}
        {user && <Notifications />}
        <SearchedUserMenu />
        <SearchUsersMenu />
        {user && <DisplayName />}
        {/* {user && <Achievements />} */}
        {/* {user && <Stats />} */}
        {/* {user && <Membership />} */}
        {user && <SearchedDirectMessageMenu />}
        {user && <Report />}
        <HowToPlay />
        <Faq />
        <Contact />
        {user && <PersonaMenu />}
        {user && <ClickedUserMenu />}
        {user && <ConversationMenu />}
        {user && <BetsMenu />}
        {user && <ClickedDirectMessageMenu />}
        {user && <BetMenu />}
        {user && <ClickedFromBets />}
        {user && <ClickedFromBetsDM />}
      </div>
    </div>
  )
}
