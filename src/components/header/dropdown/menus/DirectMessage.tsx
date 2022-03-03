import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"

export const DirectMessage: React.FC = ({}) => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="user"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Direct Messages"
          />,
          <div className="border-b-2" key={1} />,
        ]}
        thisMenu={"directMessage"}
      />
    </>
  )
}
