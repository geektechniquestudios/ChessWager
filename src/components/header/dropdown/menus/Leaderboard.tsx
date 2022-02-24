import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"

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
        <div className="border-b-2" key={1} />,
      ]}
      thisMenu={"leaderboard"}
    />
  )
}
