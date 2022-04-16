import { BiArrowBack } from "react-icons/bi"
import { DropdownState } from "../../../../containers/DropdownState"
import { DropdownItem } from "../../models/DropdownItem"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"
import { RequestList } from "./RequestList"

interface Props {}

export const RequestMenu: React.FC<Props> = ({}) => {
  const { menuStack, setMenuStack } = DropdownState.useContainer()
  // const tempMenuStack = menuStack
  // const menu = tempMenuStack.pop()
  // setMenuStack(tempMenuStack)
  return (
    <Menu
      menuItems={[
        <DropdownItem
          isBackButton
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
