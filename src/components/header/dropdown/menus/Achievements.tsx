import { BiArrowBack } from "react-icons/bi"
import { DropdownArea } from "../DropdownArea"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"
import { AchievementsList } from "./AchievementsList"

export const Achievements: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="profile"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Achievements"
        />,
        <MenuLine key={1} />,
        <DropdownArea key={2} content={<AchievementsList />} />,
      ]}
      thisMenu={"achievements"}
    />
  )
}
