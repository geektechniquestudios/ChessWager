import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"

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
