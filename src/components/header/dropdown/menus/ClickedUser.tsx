import { Menu } from "../Menu"
import { UserData } from "../areas/UserData"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { UserMenuState } from "../../../containers/UserMenuState"
import { doc, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../../../config"
import { User } from "../../../../interfaces/User"

const db = getFirestore(firebaseApp)

export const ClickedUser: React.FC = ({}) => {
  const { clickedUserId, setClickedUser } = UserMenuState.useContainer()
  const userDocRef = doc(db, "users", clickedUserId)
  const [user] = useDocumentDataOnce<[User] | any>(userDocRef)
  setClickedUser(user)

  return (
    <Menu
      menuItems={[<UserData key={2} {...user} clickedOrSearched="clicked" />]}
      thisMenu={"clickedUser"}
    />
  )
}
