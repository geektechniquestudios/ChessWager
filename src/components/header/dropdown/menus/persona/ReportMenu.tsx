import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"

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
          <MenuLine key={2} />,
        ]}
        thisMenu={"report"}
      />
    </>
  )
}
