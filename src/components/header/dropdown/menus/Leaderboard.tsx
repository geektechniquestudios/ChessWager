import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"

export const Leaderboard: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="main"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Leaderboard"
        />,
        <MenuLine key={1} />,
      ]}
      thisMenu={"leaderboard"}
    />
  )
}
