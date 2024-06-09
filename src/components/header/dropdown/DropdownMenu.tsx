import { MutableRefObject, RefObject, useEffect, useRef } from "react"
import { AuthState } from "../../../containers/AuthState"
import { DarkModeState } from "../../../containers/DarkModeState"
import { DropdownState } from "../../../containers/DropdownState"
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
import { BanUserMenu } from "./menus/ban-user/BanUserMenu"

export const DropdownMenu = () => {
  const {
    setIsDropdownOpen,
    closeDropdownMenu,
    menuRefMap,
    activeMenu,
    menuHeight,
    setMenuHeight,
  } = DropdownState.useContainer()

  const { user } = AuthState.useContainer()

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
      (dropdownRef.current?.firstChild as HTMLElement)?.offsetHeight ?? 0,
    )
  }, [setMenuHeight])

  return (
    <div
      className="dropdown absolute right-5 top-10 z-50 w-64 overflow-hidden rounded-md border-2 border-stone-400 bg-stone-100 bg-opacity-70 text-stone-800 shadow-lg backdrop-blur-md dark:border-stone-500 dark:bg-stone-700 dark:bg-opacity-70 dark:text-stone-200 dark:backdrop-blur-lg"
      style={{
        height: menuHeight,
      }}
      ref={dropdownRef}
      id="dropdown-menu"
    >
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
          <BanUserMenu />
        </>
      )}
    </div>
  )
}
