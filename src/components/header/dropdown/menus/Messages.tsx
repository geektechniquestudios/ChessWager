import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"

export const Messages: React.FC = ({}) => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="profile"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Messages"
          />,
          <div className="border-b-2" key={1} />,
        ]}
        thisMenu={"messages"}
      />
    </>
  )
}
