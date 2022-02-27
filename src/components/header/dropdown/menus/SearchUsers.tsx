import { BiArrowBack } from "react-icons/bi"
import { FiUser } from "react-icons/fi"
import { SearchArea } from "../areas/SearchArea"
import { DropdownArea } from "../DropdownArea"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"

export const SearchUsers: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="main"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Search Users"
        />,
        <MenuLine key={1} />,
        <DropdownArea key={2} content={<SearchArea />} />,
      ]}
      thisMenu={"searchUsers"}
    />
  )
}
