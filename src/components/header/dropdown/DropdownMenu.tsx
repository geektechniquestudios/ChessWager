import { MutableRefObject, RefObject, useEffect, useRef } from "react"
import { Auth } from "../../containers/Auth"
import { DarkMode } from "../../containers/DarkMode"
import { DropdownState } from "../../containers/DropdownState"
import { Main } from "./menus/Main"
import { BetMenu } from "./menus/bets/BetMenu"
import { BetsMenu } from "./menus/bets/BetsMenu"
import { BlockedMenu } from "./menus/blocked/BlockedMenu"
import { ClickedUserMenu } from "./menus/clicked-user/ClickedUserMenu"
import { ContractDataMenu } from "./menus/contract-data/ContractDataMenu"
import { FriendsMenu } from "./menus/friends/FriendsMenu"
import { Contact } from "./menus/help/Contact"
import { HowToPlay } from "./menus/help/HowToPlay"
import { HelpMenu } from "./menus/main/HelpMenu"
import { SocialMenu } from "./menus/main/SocialMenu"
import { ConversationMenu } from "./menus/messages/ConversationMenu"
import { MessagesMenu } from "./menus/messages/MessagesMenu"
import { MissedPaymentsMenu } from "./menus/missed-payments/MissedPaymentsMenu"
import { NotificationsMenu } from "./menus/notifications/NotificationsMenu"
import { PersonaMenu } from "./menus/persona/PersonaMenu"
import { ReportMenu } from "./menus/report/ReportMenu"
import { RequestMenu } from "./menus/requests/RequestMenu"
import { SearchUsersMenu } from "./menus/search/SearchUsersMenu"

export const DropdownMenu = () => {
  const {
    setIsDropdownOpen,
    closeDropdownMenu,
    menuRefMap,
    activeMenu,
    menuHeight,
    setMenuHeight,
  } = DropdownState.useContainer()

  const { user } = Auth.useContainer()

  const CloseMenuListener = (
    selfRef: MutableRefObject<HTMLDivElement | null>,
    activeMenu: string,
    menuRefMap: Map<string, RefObject<HTMLButtonElement>>,
  ) => {
    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        if (
          (menuRefMap
            .get(activeMenu)
            ?.current?.contains(event.target as Node) ??
            false) ||
          selfRef.current?.contains(event.target as Node)
        )
          return
        closeDropdownMenu()
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [selfRef, setIsDropdownOpen])
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

  CloseMenuListener(dropdownRef, activeMenu, menuRefMap)

  useEffect(() => {
    setMenuHeight(
      (dropdownRef.current?.firstChild as HTMLElement)?.offsetHeight || 0,
    )
  }, [setMenuHeight])

  const { isDarkOn } = DarkMode.useContainer()

  const bgColor = isDarkOn
    ? "rgba(68, 64, 60, 0.79)"
    : "rgba(245, 245, 244, 0.60)"

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
