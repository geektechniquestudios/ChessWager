import { Menu } from "../../Menu"
import { UserData } from "../../areas/UserData"
import { UserDataState } from "../../../../containers/UserDataState"

export const Persona: React.FC = ({}) => {
  const { userData } = UserDataState.useContainer()
  return (
    <Menu
      menuItems={[<UserData key={2} {...userData} />]}
      thisMenu={"persona"}
    />
  )
}
