import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"
import { RequestList } from "./RequestList"

interface Props {}

export const RequestMenu: React.FC<Props> = ({}) => {
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="persona"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Friend Requests"
        />,
        <MenuLine key={1} />,
        <RequestList key={2} />,
      ]}
      thisMenu="requests"
    />
  )
}
