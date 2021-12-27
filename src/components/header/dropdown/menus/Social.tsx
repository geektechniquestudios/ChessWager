import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
import { ReactComponent as BoltIcon } from "../icons/bolt.svg"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTwitterLine,
  RiRedditLine,
  RiYoutubeLine,
} from "react-icons/ri"
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
          <div className="border-b-2"> </div>,

          <StaticDropdownItem
            url="https://www.instagram.com/chesswager/"
            leftIcon={<RiInstagramLine />}
          >
            instagram
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://www.facebook.com/profile.php?id=100073643917469"
            leftIcon={<RiFacebookCircleLine />}
          >
            facebook
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://twitter.com/ChessWager"
            leftIcon={<RiTwitterLine />}
          >
            twitter
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://www.reddit.com/user/ChessWager64"
            leftIcon={<RiRedditLine />}
          >
            reddit
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://www.youtube.com/channel/UCJhScjp1G8lmF6IXRDM_paQ"
            leftIcon={<RiYoutubeLine />}
          >
            youtube
          </StaticDropdownItem>,
        ]}
        thisMenu={"social"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
