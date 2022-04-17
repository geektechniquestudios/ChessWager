import "react-toggle/style.css"
import Toggle from "react-toggle"
import { useState } from "react"
import { DropdownItem } from "../../models/DropdownItem"
import { RiChatDeleteLine } from "react-icons/ri"
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi"
import { Menu } from "../../models/Menu"
import { MdOutlineBlock } from "react-icons/md"

export const Settings: React.FC = () => {
  const [profanityFilter, setProfanityFilter] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  return (
    <Menu
      menuItems={[
        <DropdownItem
          leftIcon={<MdOutlineBlock />}
          goToMenu="blockedUsers"
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
          text="Profanity Filter"
        />,
      ]}
      thisMenu={"settings"}
    />
  )
}
