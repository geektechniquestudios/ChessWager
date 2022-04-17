import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import {
  RiGithubLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTwitterLine,
  RiRedditLine,
  RiYoutubeLine,
} from "react-icons/ri"

export const SocialMenu: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            url="https://www.instagram.com/chesswager/"
            leftIcon={<RiInstagramLine />}
            text="Instagram"
          />,
          <DropdownItem
            url="https://www.facebook.com/profile.php?id=100073643917469"
            leftIcon={<RiFacebookCircleLine />}
            text="Facebook"
          />,
          <DropdownItem
            url="https://twitter.com/ChessWager"
            leftIcon={<RiTwitterLine />}
            text="Twitter"
          />,
          <DropdownItem
            url="https://www.reddit.com/user/ChessWager64"
            leftIcon={<RiRedditLine />}
            text="Reddit"
          />,
          <DropdownItem
            url="https://www.youtube.com/channel/UCJhScjp1G8lmF6IXRDM_paQ"
            leftIcon={<RiYoutubeLine />}
            text="Youtube"
          />,
          <DropdownItem
            url="https://github.com/geektechniquestudios/ChessWager"
            leftIcon={<RiGithubLine />}
            text="Github"
          />,
        ]}
        thisMenu={"social"}
      />
    </>
  )
}
