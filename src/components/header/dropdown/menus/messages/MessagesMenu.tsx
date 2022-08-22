import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { ConversationsList } from "./ConversationsList"

export const MessagesMenu: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[<DropdownArea content={<ConversationsList />} />]}
      thisMenu={"messages"}
    />
  )
}
