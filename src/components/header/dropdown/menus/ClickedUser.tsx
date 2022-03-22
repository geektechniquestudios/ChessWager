import firebase from "firebase/compat/app"
import { FirebaseError } from "@firebase/util"

import { Menu } from "../Menu"
import { UserData } from "../areas/UserData"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { UserMenuState } from "../../../containers/UserMenuState"

const firestore = firebase.firestore()

export const ClickedUser: React.FC = ({}) => {
  const { clickedUserId } = UserMenuState.useContainer()
  const userDocRef = firestore.collection("users").doc(clickedUserId ?? "")
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
