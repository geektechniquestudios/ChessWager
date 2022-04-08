import { Menu } from "../../models/Menu"
import { UserData } from "./UserData"
import { UserDataState } from "../../../../containers/UserDataState"

export const PersonaMenu: React.FC = ({}) => {
  const { userData } = UserDataState.useContainer()
  return (
    <Menu
      menuItems={[<UserData key={2} {...userData} activeMenu={"persona"}/>]}
      thisMenu={"persona"}
    />
  )
}
