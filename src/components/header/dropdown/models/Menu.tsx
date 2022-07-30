import { useEffect } from "react"
import { BiArrowBack } from "react-icons/bi"
import { CSSTransition } from "react-transition-group"
import { Auth } from "../../../containers/Auth"
import { DropdownState } from "../../../containers/DropdownState"
import { UserMenuState } from "../../../containers/UserMenuState"
import { DropdownItem } from "./DropdownItem"
import { MenuLine } from "./MenuLine"

interface Props {
  thisMenu: string
  menuItems: React.ReactNode[]
}

export const Menu: React.FC<Props> = ({ thisMenu, menuItems }) => {
  const { activeMenu, setMenuHeight, menuStack } = DropdownState.useContainer()
  const { clickedUser } = UserMenuState.useContainer()

  const calcHeight = (el: HTMLElement) => {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  const { auth } = Auth.useContainer()

  const menuTitle = new Map<string, string>()
  menuTitle.set("main", "Menu")
  menuTitle.set("social", "Social")
  menuTitle.set("help", "Help")
  menuTitle.set("bets", "Bets")
  menuTitle.set("bet", "Bet")
  menuTitle.set("requests", "Requests")
  menuTitle.set("report", "Report")
  menuTitle.set("searchUsers", "Search")
  menuTitle.set("messages", "Messages")
  menuTitle.set("conversation", "Conversation")
  menuTitle.set("notifications", "Notifications")
  menuTitle.set("clickedUser", clickedUser?.displayName ?? "")
  menuTitle.set("persona", auth.currentUser?.displayName ?? "")

  useEffect(() => {
    menuTitle.set("clickedUser", clickedUser?.displayName ?? "")
  }, [clickedUser?.displayName])

  const menuHeader =
    menuStack.length > 1
      ? [
          <DropdownItem
            isBackButton
            leftIcon={<BiArrowBack />}
            key={-2}
            text={
              menuTitle.get(menuStack[menuStack.length - 2]) ??
              menuStack[menuStack.length - 2]
            }
          />,
          <MenuLine key={-1} />,
        ]
      : []

  return (
    <CSSTransition
      in={activeMenu === thisMenu}
      timeout={300}
      classNames="menu-primary"
      unmountOnExit
      onEnter={calcHeight}
    >
      <div className="w-64" id={thisMenu}>
        {[
          ...menuHeader,
          menuItems.map((item: React.ReactNode, index) => (
            <div key={index}>{item}</div>
          )),
        ]}
      </div>
    </CSSTransition>
  )
}
