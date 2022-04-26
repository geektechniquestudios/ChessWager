import { arrayRemove, doc, getFirestore, writeBatch } from "firebase/firestore"
import { RiUserUnfollowLine } from "react-icons/ri"
import { firebaseApp } from "../../../../../../config"
import { Auth } from "../../../../../containers/Auth"
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

    const batch = writeBatch(db)
    batch.update(userRef, {
      friends: arrayRemove(id),
      sentFriendRequests: arrayRemove(id),
      redactedFriendRequests: arrayRemove(id),
    })
    batch.update(targetUserRef, {
      friends: arrayRemove(auth.currentUser!.uid),
      sentFriendRequests: arrayRemove(auth.currentUser!.uid),
      redactedFriendRequests: arrayRemove(auth.currentUser!.uid),
    })

    batch.delete(doc(userRef, "requests", id))
    batch.delete(doc(targetUserRef, "requests", auth.currentUser!.uid))

    batch.commit()
  }

  return (
    <DropdownButton
      content={<RiUserUnfollowLine />}
      onClick={removeFriend}
      title="Remove Friend"
    />
  )
}
