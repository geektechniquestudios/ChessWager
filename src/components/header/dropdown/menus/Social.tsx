import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import {
  RiGithubLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTwitterLine,
  RiRedditLine,
  RiYoutubeLine,
} from "react-icons/ri"
import { MenuLine } from "../MenuLine"

export const Social: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Social"
          />,
          <MenuLine key={1} />,
          <DropdownItem
            url="https://www.instagram.com/chesswager/"
            leftIcon={<RiInstagramLine />}
            key={2}
            text="Instagram"
          />,
          <DropdownItem
            url="https://www.facebook.com/profile.php?id=100073643917469"
            leftIcon={<RiFacebookCircleLine />}
            key={3}
            text="Facebook"
          />,
          <DropdownItem
            url="https://twitter.com/ChessWager"
            leftIcon={<RiTwitterLine />}
            key={4}
            text="Twitter"
          />,
          <DropdownItem
            url="https://www.reddit.com/user/ChessWager64"
            leftIcon={<RiRedditLine />}
            key={5}
            text="Reddit"
          />,
          <DropdownItem
            url="https://www.youtube.com/channel/UCJhScjp1G8lmF6IXRDM_paQ"
            leftIcon={<RiYoutubeLine />}
            key={6}
            text="Youtube"
          />,
          <DropdownItem
            url="https://github.com/geektechniquestudios/ChessWager"
            leftIcon={<RiGithubLine />}
            key={7}
            text="Github"
          />,
        ]}
        thisMenu={"social"}
      />
    </>
  )
}
