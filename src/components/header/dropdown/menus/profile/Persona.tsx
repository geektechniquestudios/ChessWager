import { Menu } from "../../Menu"
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
    <Menu menuItems={[<UserData key={2} {...user} />]} thisMenu={"persona"} />
  )
}
