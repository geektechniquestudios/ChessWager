import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore"
import { BsCheck2, BsX } from "react-icons/bs"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"
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
  const { auth } = Auth.useContainer()

  const targetUserRef = doc(db, "users", id)
  const notificationsCollection = collection(targetUserRef, "notifications")
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const requestsCollection = collection(userRef, "requests")

  const acceptRequest = () => {
    const batch = writeBatch(db)
    batch.set(
      doc(notificationsCollection, auth.currentUser!.uid + Timestamp.now()),
      {
        createdAt: serverTimestamp(),
        text: `${auth.currentUser!.displayName} accepted your friend request.`,
        isRead: false,
      },
    )
    batch.update(targetUserRef, {
      hasNewNotifications: true,
      friends: arrayUnion(auth.currentUser!.uid),
    })
    batch.update(userRef, {
      friends: arrayUnion(id),
    })
    batch.delete(doc(requestsCollection, id))
    batch.commit()
  }

  const declineRequest = () => {
    deleteDoc(doc(requestsCollection, id))
  }

  const { setActiveMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  return (
    <a
      className="h-12 w-64 px-4 flex items-center justify-between hover:bg-stone-300 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift gap-3"
      style={{ direction: "ltr" }}
      onClick={() => {
        setClickedUserById(id)
        setActiveMenu("userDataFromRequests")
      }}
    >
      <img src={photoURL} className="rounded-full w-7 h-7" />
      <p>{userName}</p>
      <div className="flex items-center justify-center gap-3">
        <DropdownButton
          onClick={(e) => {
            e.stopPropagation()
            acceptRequest()
          }}
          content={<BsCheck2 />}
          title="Accept"
        />
        <DropdownButton
          onClick={(e) => {
            e.stopPropagation()
            declineRequest()
          }}
          content={<BsX />}
          title="Decline"
        />
      </div>
    </a>
  )
}
