import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore"
import { RiUserUnfollowLine } from "react-icons/ri"
import { firebaseApp } from "../../../../../../config"
import { Auth } from "../../../../../containers/Auth"
import { UserDataState } from "../../../../../containers/UserDataState"
import { DropdownButton } from "./DropdownButton"

const db = getFirestore(firebaseApp)

interface Props {
  id: string
}

export const RemoveFriendButton: React.FC<Props> = ({ id }) => {
  const { auth } = Auth.useContainer()
  const removeFriend = () => {
    const targetUserRef = doc(db, "users", id)
    const userRef = doc(db, "users", auth.currentUser!.uid)

    deleteDoc(doc(userRef, "friends", id))
    deleteDoc(doc(targetUserRef, "friends", auth.currentUser!.uid))
  }

  return (
    <DropdownButton
      content={<RiUserUnfollowLine />}
      onClick={removeFriend}
      title="Remove Friend"
    />
  )
}
