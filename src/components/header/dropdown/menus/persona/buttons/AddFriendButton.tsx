import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore"
import { RiUserAddLine } from "react-icons/ri"
import { AuthState } from "../../../../../../containers/AuthState"
import { UserDataState } from "../../../../../../containers/UserDataState"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const AddFriendButton: React.FC<Props> = ({ id }) => {
  const { auth, db } = AuthState.useContainer()
  const { userData } = UserDataState.useContainer()
  const addFriend = () => {
    const targetUserRef = doc(db, "users", id)
    const requestsCollection = collection(targetUserRef, "requests")
    const userRef = doc(db, "users", auth.currentUser!.uid)
    const notificationsCollection = collection(targetUserRef, "notifications")

    const batch = writeBatch(db)
    batch.set(
      doc(requestsCollection, auth.currentUser!.uid),
      {
        userName: auth.currentUser!.displayName,
        photoURL: auth.currentUser!.photoURL,
        createdAt: serverTimestamp(),
      },
      { merge: true },
    )
    if (!userData!.sentFriendRequests.includes(id)) {
      batch.set(
        doc(notificationsCollection, auth.currentUser!.uid + Timestamp.now()),
        {
          uid: auth.currentUser!.uid,
          createdAt: serverTimestamp(),
          text: `${auth.currentUser!.displayName} sent you a friend request.`,
          clickedUserId: "",
          openToMenu: "requests",
          isRead: false,
        },
      )
      batch.update(targetUserRef, {
        hasNewNotifications: true,
      })
    }
    batch.update(userRef, {
      sentFriendRequests: arrayUnion(id),
      redactedFriendRequests: arrayRemove(id),
    })

    batch.commit()
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
