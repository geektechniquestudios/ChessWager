import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { BsCheck2, BsX } from "react-icons/bs"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { DropdownButton } from "../persona/buttons/DropdownButton"

const db = getFirestore(firebaseApp)

interface Props {
  id: string
  userName: string
  photoURL: string
  createdAt: Timestamp
}

export const RequestItem: React.FC<Props> = ({
  id,
  userName,
  photoURL,
  createdAt,
}) => {
  const targetUserRef = doc(db, "users", id)
  const notificationsCollection = collection(targetUserRef, "notifications")
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const requestsCollection = collection(userRef, "requests")

  const acceptRequest = () => {
    // setDoc(targetUserRef, {
    //   friends: arrayUnion(auth.currentUser!.uid),
    // })
    // setDoc(doc(userRef, "friends", id), {
    //   id,
    //   userName,
    //   photoURL,
    //   createdAt,
    // })
    deleteDoc(doc(requestsCollection, auth.currentUser!.uid))
    setDoc(
      doc(notificationsCollection, auth.currentUser!.uid + Timestamp.now()),
      {
        createdAt: Timestamp.now(),
        text: `${auth.currentUser!.displayName} accepted your friend request.`,
        // openToMenu: "",
        isRead: false,
      },
    )
    updateDoc(targetUserRef, {
      hasNewNotifications: true,
      friends: arrayUnion(auth.currentUser!.uid),
    })
    updateDoc(userRef, {
      friends: arrayUnion(id),
    })
  }
  const declineRequest = () => {}
  return (
    <div
      className="h-12 w-64 px-4 flex items-center justify-between hover:bg-stone-300 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift gap-3"
      style={{ direction: "ltr" }}
    >
      <img src={photoURL} className="rounded-full w-7 h-7" />
      <p>{userName}</p>
      <div className="flex items-center justify-center gap-3">
        <DropdownButton
          onClick={() => {
            acceptRequest()
          }}
          content={<BsCheck2 />}
          title="Accept"
        />
        <DropdownButton
          onClick={() => {
            declineRequest()
          }}
          content={<BsX />}
          title="Decline"
        />
      </div>
    </div>
  )
}
