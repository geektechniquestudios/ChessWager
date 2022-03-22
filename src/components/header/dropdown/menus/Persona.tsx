import firebase from "firebase/compat/app"
import { FirebaseError } from "@firebase/util"

import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"
import { UserData } from "../areas/UserData"
import { Auth } from "../../../containers/Auth"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { User } from "../../../../interfaces/User"

const firestore = firebase.firestore()

export const Persona: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const userDocRef = firestore
    .collection("users")
    .doc(auth.currentUser?.uid ?? "")
  const [user]: [User | undefined, boolean, FirebaseError | undefined] =
    useDocumentDataOnce(userDocRef)
  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="profile"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Persona"
        />,
        <MenuLine key={1} />,
        <UserData key={2} {...user} />,
      ]}
      thisMenu={"persona"}
    />
  )
}
