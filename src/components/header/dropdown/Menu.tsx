import { CSSTransition } from "react-transition-group"

interface Props {
  activeMenu: string
  thisMenu: string
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
  menuItems: any
}

export const Menu: React.FC<Props> = ({
  activeMenu,
  thisMenu,
  setMenuHeight,
  heightMultiplier,
  menuItems,
}) => {
  const calcHeight = (el: any) => {
    const height = el.offsetHeight * heightMultiplier
    setMenuHeight(height)
  }

  return (
    <>
      <CSSTransition
        in={activeMenu === thisMenu}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">{menuItems.map((item: any) => item)}</div>
      </CSSTransition>
    </>
  )
}
