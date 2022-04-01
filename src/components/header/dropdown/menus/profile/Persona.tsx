import { DropdownItem } from "../../DropdownItem"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"
import { UserData } from "../../areas/UserData"
import { Auth } from "../../../../containers/Auth"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import type { User } from "../../../../../interfaces/User"
import {
  doc,
  DocumentData,
  FirestoreError,
  getFirestore,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types"
import { CgProfile } from "react-icons/cg"

const db = getFirestore(firebaseApp)

export const Persona: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const userDocRef = doc(db, "users", auth.currentUser!.uid)
  const [user]:
    | [
        Data<DocumentData, keyof User, keyof User> | undefined,
        boolean,
        FirestoreError | undefined,
      ]
    | any = useDocumentDataOnce(userDocRef)
  return (
    <Menu
      menuItems={[
        <DropdownItem leftIcon={<CgProfile />} key={0} text="Persona" />,
        <MenuLine key={1} />,
        <UserData key={2} {...user} />,
      ]}
      thisMenu={"persona"}
    />
  )
}
