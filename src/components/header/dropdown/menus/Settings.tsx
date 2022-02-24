import "../../../../style/dropdown.scss"

import { useState } from "react"
import { DropdownItem } from "../DropdownItem"
import Toggle from "react-toggle"

import { RiChatDeleteLine } from "react-icons/ri"
import { BiArrowBack, BiVolumeFull, BiVolumeMute } from "react-icons/bi"
import { Menu } from "../Menu"
import { MdOutlineBlock } from "react-icons/md"
import { MenuLine } from "../MenuLine"

export const Settings: React.FC = () => {
  const [profanityFilter, setProfanityFilter] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Settings"
          />,
          <MenuLine key={1} />,
          <DropdownItem
            leftIcon={<MdOutlineBlock />}
            goToMenu="blocked"
            key={2}
            text="Blocked Users"
          />,
          <DropdownItem
            onClick={() => {
              setIsMuted(!isMuted)
            }}
            leftIcon={isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
            rightIcon={
              <Toggle
                className="filter-toggle pointer-events-none"
                checked={isMuted}
                readOnly
              />
            }
            key={3}
            text={isMuted ? "Sound" : "Muted"}
          />,
          <DropdownItem
            leftIcon={<RiChatDeleteLine />}
            onClick={() => {
              setProfanityFilter(!profanityFilter)
            }}
            rightIcon={
              <Toggle
                className="filter-toggle pointer-events-none"
                checked={profanityFilter}
                readOnly
              />
            }
            key={4}
            text="Profanity Filter"
          />,
        ]}
        thisMenu={"settings"}
      />
    </>
  )
}
