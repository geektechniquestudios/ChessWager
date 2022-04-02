import { DropdownArea } from "../../DropdownArea"
import { Menu } from "../../Menu"
import { ConversationsList } from "../messages/ConversationsList"

export const Messages: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[<DropdownArea key={2} content={<ConversationsList />} />]}
      thisMenu={"messages"}
    />
  )
}
