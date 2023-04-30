import { ReactNode, useEffect, useRef } from "react"
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

  const { auth } = Auth.useContainer()

  // This map converts the stored menu name in code to the name that actually displays
  // When you add a new menu, you need to add the name here
  const menuTitle = new Map<string, string>([
    ["main", "Menu"],
    ["social", "Social"],
    ["help", "Help"],
    ["bets", "Bets"],
    ["bet", "Bet"],
    ["howToPlay", "How To Play"],
    ["requests", "Requests"],
    ["report", "Report"],
    ["searchUsers", "Search"],
    ["messages", "Messages"],
    ["conversation", "Conversation"],
    ["notifications", "Notifications"],
    ["clickedUser", clickedUser?.displayName ?? ""],
    ["persona", auth.currentUser?.displayName ?? ""],
    ["blocked", "Blocked"],
    ["contractData", "Contract Data"],
    ["missedPayments", "Missed Payments"],
  ])

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

  const calcHeight = () => {
    setMenuHeight(dropdownRef?.current?.offsetHeight ?? 0)
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

  return (
    <CSSTransition
      in={activeMenu === thisMenu}
      timeout={300}
      classNames="menu-primary"
      unmountOnExit
      onEnter={calcHeight}
      nodeRef={dropdownRef}
    >
      <div
        className="grid w-full place-content-center"
        ref={dropdownRef}
        id={thisMenu}
      >
        {[
          ...menuHeader,
          menuItems.map((item: ReactNode, index) => (
            <div className="w-64 pb-1" key={index}>
              {item}
            </div>
          )),
        ]}
      </div>
    </CSSTransition>
  )
}
