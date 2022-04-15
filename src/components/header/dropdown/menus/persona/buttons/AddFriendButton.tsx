import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { RiUserAddLine } from "react-icons/ri"
import { firebaseApp } from "../../../../../../config"
import { Auth } from "../../../../../containers/Auth"
import { UserDataState } from "../../../../../containers/UserDataState"
import { DropdownButton } from "./DropdownButton"

const db = getFirestore(firebaseApp)

interface Props {
  id: string
}

export const AddFriendButton: React.FC<Props> = ({ id }) => {
  const { auth } = Auth.useContainer()
  const { userData } = UserDataState.useContainer()
  const addFriend = () => {
    const targetUserRef = doc(db, "users", id)
    const requestsCollection = collection(targetUserRef, "requests")
    const userRef = doc(db, "users", auth.currentUser!.uid)
    const notificationsCollection = collection(targetUserRef, "notifications")

    setDoc(
      doc(requestsCollection, auth.currentUser!.uid),
      {
        userName: auth.currentUser!.displayName,
        photoURL: auth.currentUser!.photoURL,
        createdAt: Timestamp.now(),
      },
      { merge: true },
    )
    if (!userData!.sentFriendRequests.includes(id)) {
      setDoc(
        doc(notificationsCollection, auth.currentUser!.uid + Timestamp.now()),
        {
          createdAt: Timestamp.now(),
          text: `${auth.currentUser!.displayName} sent you a friend request.`,
          openToMenu: "requestsFromNotifications",
          isRead: false,
        },
      )
      // also write rule for this; can't update notications of target user if a friend request has already been sent at some point
      updateDoc(targetUserRef, {
        hasNewNotifications: true,
      })
    }
    updateDoc(userRef, {
      sentFriendRequests: arrayUnion(id),
      redactedFriendRequests: arrayRemove(id),
    })
  }
  return (
    <DropdownButton
      content={<RiUserAddLine />}
      onClick={() => {
        addFriend()
      }}
      title="Add Friend"
    />
  )
}
