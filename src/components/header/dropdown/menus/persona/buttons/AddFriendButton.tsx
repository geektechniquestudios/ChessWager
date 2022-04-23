import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  Timestamp,
  writeBatch,
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
      // batch.set(
      //   doc(notificationsCollection, auth.currentUser!.uid + Timestamp.now()),
      //   {
      //     createdAt: serverTimestamp(),
      //     text: `${auth.currentUser!.displayName} sent you a friend request.`,
      //     openToMenu: "requests",
      //     isRead: false,
      //   },
      // )
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
