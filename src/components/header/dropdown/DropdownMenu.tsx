import { MutableRefObject, useEffect, useRef } from "react"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { Contact } from "./menus/help/Contact"
import { HelpMenu } from "./menus/main/HelpMenu"
import { HowToPlay } from "./menus/help/HowToPlay"
import { Main } from "./menus/Main"
import { NotificationsMenu } from "./menus/notifications/NotificationsMenu"
import { SearchUsersMenu } from "./menus/search/SearchUsersMenu"
import { SocialMenu } from "./menus/main/SocialMenu"
import { PersonaMenu } from "./menus/persona/PersonaMenu"
import { ClickedUserMenu } from "./menus/clicked-user/ClickedUserMenu"
import { ConversationMenu } from "./menus/messages/ConversationMenu"
import { FriendsMenu } from "./menus/friends/FriendsMenu"
import { BetsMenu } from "./menus/bets/BetsMenu"
import { DarkMode } from "../../containers/DarkMode"
import { BetMenu } from "./menus/bets/BetMenu"
import { BlockedMenu } from "./menus/blocked/BlockedMenu"
import { RequestMenu } from "./menus/requests/RequestMenu"
import { ReportMenu } from "./menus/report/ReportMenu"
import { MessagesMenu } from "./menus/messages/MessagesMenu"
import { ContractDataMenu } from "./menus/contract-data/ContractDataMenu"
import { MissedPaymentsMenu } from "./menus/missed-payments/MissedPaymentsMenu"

export const DropdownMenu = () => {
  const { setMenuStack } = DropdownState.useContainer()
  const CloseMenuListener = (ref: MutableRefObject<any>) => {
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
          setMenuStack([])
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
      className={`${firefoxColors} dropdown absolute right-5 top-10 z-50 w-64 overflow-hidden rounded-md border-2 border-stone-400 text-stone-800 shadow-lg dark:border-stone-500 dark:text-stone-200`}
      style={{
        height: menuHeight,
        background: bgColor,
        backdropFilter: blur,
      }}
      ref={dropdownRef}
      id="dropdown-menu"
    >
      <div className="flex justify-center">
        <Main />
        <SocialMenu />
        <HelpMenu />
        <SearchUsersMenu />
        <HowToPlay />
        <Contact />
        {user && (
          <>
            <NotificationsMenu />
            <MessagesMenu />
            <PersonaMenu />
            <ClickedUserMenu />
            <ConversationMenu />
            <BetsMenu />
            <BetMenu />
            <BlockedMenu />
            <FriendsMenu />
            <RequestMenu />
            <ReportMenu />
            <ContractDataMenu />
            <MissedPaymentsMenu />
          </>
        )}
      </div>
    </div>
  )
}
