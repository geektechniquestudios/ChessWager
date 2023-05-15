import { Menu } from "../../models/Menu"
import { ConversationsList } from "./ConversationsList"

export const MessagesMenu: React.FC = ({}) => {
  return <Menu menuItems={[<ConversationsList />]} thisMenu={"messages"} />
}
