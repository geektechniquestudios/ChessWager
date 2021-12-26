import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
import { ReactComponent as BoltIcon } from "../icons/bolt.svg"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import {
  BsFacebook,
  BsInstagram,
  BsReddit,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs"
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
            url="https://www.instagram.com/chesswager/"
            leftIcon={<BsInstagram />}
          >
            instagram
          </StaticDropdownItem>,
          
          <StaticDropdownItem
            url="https://www.facebook.com/profile.php?id=100073643917469"
            leftIcon={<BsFacebook />}
          >
            facebook
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://twitter.com/ChessWager"
            leftIcon={<BsTwitter />}
          >
            twitter
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://www.reddit.com/user/ChessWager64"
            leftIcon={<BsReddit />}
          >
            reddit
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://www.youtube.com/channel/UCJhScjp1G8lmF6IXRDM_paQ"
            leftIcon={<BsYoutube />}
          >
            youtube
          </StaticDropdownItem>,
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
