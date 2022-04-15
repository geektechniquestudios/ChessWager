import {
  collection,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"

const db = getFirestore(firebaseApp)

interface Props {
  text: string
  openToMenu?: string
  createdAt: Timestamp
  isRead: boolean
  id: string
}

export const NotificationItem: React.FC<Props> = ({
  text,
  openToMenu,
  createdAt,
  isRead,
  id,
}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  const unreadStyle = isRead ? "" : "bg-stone-400 dark:bg-stone-800"
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const notifications = collection(userRef, "notifications")
  const notificationRef = doc(notifications, id)
  const setAsRead = () => {
    updateDoc(notificationRef, {
      isRead: true,
    })
  }
  return (
    <button
      className={`h-12 w-64 px-4 flex items-center hover:bg-stone-300 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift ${unreadStyle}`}
      style={{ direction: "ltr" }}
      onClick={() => {
        openToMenu && setActiveMenu(openToMenu)
        setAsRead()
      }}
    >
      <p className="text-xs">{text}</p>
    </button>
  )
}
