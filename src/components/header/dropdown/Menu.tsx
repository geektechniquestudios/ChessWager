import { CSSTransition } from "react-transition-group"
import { DropdownState } from "../../containers/DropdownState"

interface Props {
  thisMenu: string
  menuItems: React.ReactNode[]
}

export const Menu: React.FC<Props> = ({ thisMenu, menuItems }) => {
  const { activeMenu, setMenuHeight } = DropdownState.useContainer()

  const calcHeight = (el: any) => {
    const height = el.offsetHeight
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
      <div className="w-64">{menuItems.map((item: any) => item)}</div>
    </CSSTransition>
  )
}
