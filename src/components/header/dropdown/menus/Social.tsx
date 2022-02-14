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
import { StaticDropdownItem } from "../StaticDropdownItem"

export const Social: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem goToMenu="main" leftIcon={<BiArrowBack />} key={0}>
            <h2>Social</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1} />,
          <StaticDropdownItem
            url="https://www.instagram.com/chesswager/"
            leftIcon={<RiInstagramLine />}
            key={2}
          >
            Instagram
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://www.facebook.com/profile.php?id=100073643917469"
            leftIcon={<RiFacebookCircleLine />}
            key={3}
          >
            Facebook
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://twitter.com/ChessWager"
            leftIcon={<RiTwitterLine />}
            key={4}
          >
            Twitter
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://www.reddit.com/user/ChessWager64"
            leftIcon={<RiRedditLine />}
            key={5}
          >
            Reddit
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://www.youtube.com/channel/UCJhScjp1G8lmF6IXRDM_paQ"
            leftIcon={<RiYoutubeLine />}
            key={6}
          >
            Youtube
          </StaticDropdownItem>,

          <StaticDropdownItem
            url="https://github.com/geektechniquestudios/ChessWager"
            leftIcon={<RiGithubLine />}
            key={7}
          >
            Github
          </StaticDropdownItem>,
        ]}
        thisMenu={"social"}
      />
    </>
  )
}
