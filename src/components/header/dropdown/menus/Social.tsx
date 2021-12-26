import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
import { ReactComponent as BoltIcon } from "../icons/bolt.svg"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { BsFacebook } from "react-icons/bs"
import { StaticDropdownItem } from "../StaticDropdownItem"
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

          <StaticDropdownItem
            url="https://www.google.com"
            leftIcon={<BsFacebook />}
          >
            Facebook
          </StaticDropdownItem>,

          <DropdownItem setActiveMenu={setActiveMenu}>a change</DropdownItem>,

          <DropdownItem setActiveMenu={setActiveMenu}>JavaScript</DropdownItem>,
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
