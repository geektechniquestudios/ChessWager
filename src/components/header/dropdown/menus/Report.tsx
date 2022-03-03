import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"

export const Report: React.FC = ({}) => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="user"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Report"
          />,
          <MenuLine />,
        ]}
        thisMenu={"report"}
      />
    </>
  )
}
