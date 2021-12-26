import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { useState } from "react"
import { DropdownItem } from "../DropdownItem"
import Toggle from "react-toggle"

import { StaticDropdownItem } from "../StaticDropdownItem"
import { RiChatDeleteLine } from "react-icons/ri"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { MdOutlineBlock } from "react-icons/md"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
}

export const Settings: React.FC<Props> = ({
  activeMenu,
  setActiveMenu,
  setMenuHeight,
  heightMultiplier,
}) => {
  const [profanityFilter, setProfanityFilter] = useState(true)
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            setActiveMenu={setActiveMenu}
          >
            <h2>settings</h2>
          </DropdownItem>,
          <div className="border-b-2"> </div>,

          <StaticDropdownItem
            leftIcon={<RiChatDeleteLine />}
            onClick={() => {
              setProfanityFilter(!profanityFilter)
            }}
            rightIcon={
              <div className="px-2 justify-center align-middle flex h-full py-2 ">
                <Toggle
                  // icons={false}
                  className="filter-toggle pointer-events-none "
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    setProfanityFilter(isChecked)
                  }}
                  checked={profanityFilter}
                />
              </div>
            }
          >
            profanity filter
          </StaticDropdownItem>,
          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<MdOutlineBlock />}
            goToMenu="blocked"
          >
            blocked users
          </DropdownItem>,

          <DropdownItem setActiveMenu={setActiveMenu}>JavaScript</DropdownItem>,
          <DropdownItem setActiveMenu={setActiveMenu}>Awesome!</DropdownItem>,
        ]}
        thisMenu={"settings"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
