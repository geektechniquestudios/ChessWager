import { FirebaseError } from "@firebase/util"

import { Menu } from "../Menu"
import { UserData } from "../areas/UserData"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { UserMenuState } from "../../../containers/UserMenuState"
import { doc, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../../../config"

const db = getFirestore(firebaseApp)

export const ClickedUser: React.FC = ({}) => {
  const { clickedUserId } = UserMenuState.useContainer()
  const userDocRef = doc(db, "users", clickedUserId)
  const [user, isLoading]: [
    any | undefined,
    boolean,
    FirebaseError | undefined,
  ] = useDocumentDataOnce(userDocRef)
  return (
    <Menu
      menuItems={[<UserData key={2} {...user} isLoading={isLoading} />]}
      thisMenu={"clickedUser"}
    />
  )
}
