import { DropdownArea } from "../../../models/DropdownArea"
import { Menu } from "../../../models/Menu"
import { ConversationsList } from "../../messages/ConversationsList"

export const Messages: React.FC = ({}) => {
  return (
    <Menu
      menuItems={[<DropdownArea key={2} content={<ConversationsList />} />]}
      thisMenu={"messages"}
    />
  )
}
