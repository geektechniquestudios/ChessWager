import { Menu } from "../../models/Menu"
import { ConversationData } from "./ConversationData"

interface Props {}

export const ConversationMenu: React.FC<Props> = ({}) => {
  return <Menu menuItems={[<ConversationData />]} thisMenu={"conversation"} />
}
