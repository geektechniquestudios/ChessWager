import "../../../../style/dropdown.scss"

import { DropdownItem } from "../DropdownItem"

import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { BsSuitClub } from "react-icons/bs"
import { SiOpenbadges } from "react-icons/si"
import { GiMonkey } from "react-icons/gi"
import { RiShirtLine } from "react-icons/ri"

export const Store: React.FC = () => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Store"
          />,
          <div
            className="border-b-2 border-stone-400 dark:border-stone-600"
            key={1}
          />,
          <DropdownItem
            leftIcon={<BsSuitClub />}
            goToMenu="blocked"
            key={2}
            text="Membership"
          />,
          <DropdownItem
            leftIcon={<SiOpenbadges />}
            goToMenu="blocked"
            key={3}
            text="Badges"
          />,
          <DropdownItem
            leftIcon={<GiMonkey />}
            goToMenu="blocked"
            key={4}
            text="NFTs"
          />,
          <DropdownItem
            leftIcon={<RiShirtLine />}
            goToMenu="blocked"
            key={5}
            text="Merch"
          />,
        ]}
        thisMenu={"store"}
      />
    </>
  )
}
