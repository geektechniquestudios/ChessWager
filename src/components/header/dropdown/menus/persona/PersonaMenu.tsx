import { Menu } from "../../models/Menu"
import { UserData } from "./UserData"
import { UserDataState } from "../../../../containers/UserDataState"

export const PersonaMenu: React.FC = ({}) => {
  const { userData } = UserDataState.useContainer()
  return <Menu menuItems={[<UserData {...userData} />]} thisMenu={"persona"} />
}
