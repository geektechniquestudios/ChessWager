import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
import { ReactComponent as BoltIcon } from "../icons/bolt.svg"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
}

export const Social: React.FC<Props> = ({
  activeMenu,
  setActiveMenu,
  setMenuHeight,
  heightMultiplier,
}) => {
 return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            setActiveMenu={setActiveMenu}
          >
            <h2>social</h2>
          </DropdownItem>,
          <DropdownItem setActiveMenu={setActiveMenu}>HTML</DropdownItem>,
          <DropdownItem setActiveMenu={setActiveMenu}>CSS</DropdownItem>,
          <DropdownItem setActiveMenu={setActiveMenu}>JavaScript</DropdownItem>,
          <DropdownItem setActiveMenu={setActiveMenu}>Awesome!</DropdownItem>,
        ]}
        thisMenu={"social"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
