import { CSSTransition } from "react-transition-group"
import { DropdownState } from "../../containers/DropdownState"

interface Props {
  thisMenu: string
  menuItems: React.ReactNode[]
}

export const Menu: React.FC<Props> = ({ thisMenu, menuItems }) => {
  const { activeMenu, heightMultiplier, setMenuHeight } =
    DropdownState.useContainer()

  const calcHeight = (el: any) => {
    const height = el.offsetHeight * heightMultiplier
    setMenuHeight(height)
  }

  return (
    <CSSTransition
      in={activeMenu === thisMenu}
      timeout={500}
      classNames="menu-primary"
      unmountOnExit
      onEnter={calcHeight}
    >
      <div className="w-52">{menuItems.map((item: any) => item)}</div>
    </CSSTransition>
  )
}
