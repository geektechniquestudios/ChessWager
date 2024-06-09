import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore"
import { BsCheck2, BsX } from "react-icons/bs"
import { AuthState } from "../../../../../containers/AuthState"
import { DropdownState } from "../../../../../containers/DropdownState"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { DropdownButton } from "../persona/buttons/DropdownButton"

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
  const { auth, db } = AuthState.useContainer()

  const targetUserRef = doc(db, "users", id)
  const notificationsCollection = collection(targetUserRef, "notifications")
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const requestsCollection = collection(userRef, "requests")

  const acceptRequest = () => {
    const batch = writeBatch(db)
    batch.set(
      doc(notificationsCollection, auth.currentUser!.uid + Timestamp.now()),
      {
        uid: auth.currentUser!.uid,
        createdAt: serverTimestamp(),
        text: `${auth.currentUser!.displayName} accepted your friend request.`,
        clickedUserId: auth.currentUser!.uid,
        openToMenu: "clickedUser",
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

  const { goToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  return (
    <a
      className="color-shift flex h-12 items-center justify-between gap-3 px-4 text-stone-900 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200"
      style={{ direction: "ltr" }}
      onClick={() => {
        setClickedUserById(id)
        goToMenu("clickedUser")
      }}
    >
      <img src={photoURL} className="h-7 w-7 rounded-full" />
      <p>{userName}</p>
      <div className="flex items-center justify-center gap-3">
        <DropdownButton
          onClick={(e) => {
            e.stopPropagation()
            acceptRequest()
          }}
          content={<BsCheck2 />}
          title="Accept"
          className="h-4 w-4 hover:bg-green-200 dark:hover:bg-green-700"
        />
        <DropdownButton
          onClick={(e) => {
            e.stopPropagation()
            declineRequest()
          }}
          content={<BsX />}
          title="Decline"
          className="h-4 w-4 hover:bg-red-200 dark:hover:bg-red-700"
        />
      </div>
    </a>
  )
}
