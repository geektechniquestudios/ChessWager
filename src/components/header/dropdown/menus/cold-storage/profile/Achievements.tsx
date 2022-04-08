import { BiArrowBack } from "react-icons/bi"
import { DropdownArea } from "../../../models/DropdownArea"
import { DropdownItem } from "../../../models/DropdownItem"
import { Menu } from "../../../models/Menu"
import { MenuLine } from "../../../models/MenuLine"
import { AchievementsList } from "../AchievementsList"

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
