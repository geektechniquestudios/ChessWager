import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { BsX } from "react-icons/bs"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { DropdownButton } from "../persona/buttons/DropdownButton"
import { Notification } from "../../../../../interfaces/Notification"

const db = getFirestore(firebaseApp)

interface Props {
  text: string
  openToMenu?: string
  clickedUserId?: string
  createdAt: Timestamp
  isRead: boolean
  id: string
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
  notifications: Notification[]
}

export const NotificationItem: React.FC<Props> = ({
  text,
  openToMenu,
  clickedUserId,
  createdAt,
  isRead,
  id,
  setNotifications,
  notifications,
}) => {
  const { goToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const notificationsCollection = collection(userRef, "notifications")
  const notificationRef = doc(notificationsCollection, id)

  const setAsRead = () => {
    updateDoc(notificationRef, {
      isRead: true,
    })
  }

  const updateNotifications = () => {
    const tempNotifications = notifications.filter(
      (notification) => notification.id !== id,
    )
    setNotifications(tempNotifications)
  }

  const unreadStyle = isRead
    ? "dark:text-stone-400 text-stone-600"
    : "font-bold dark:text-stone-300 text-stone-900"

  return (
    <a
      className={`color-shift flex h-12 w-64 items-center justify-between gap-1 px-4 text-stone-900 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200 ${unreadStyle}`}
      style={{ direction: "ltr" }}
      onClick={() => {
        clickedUserId && setClickedUserById(clickedUserId)
        if (openToMenu && openToMenu !== "") {
          goToMenu(openToMenu)
        }
        setAsRead()
      }}
    >
      <p className="pointer-events-auto text-left text-xs">{text}</p>
      <DropdownButton
        content={<BsX />}
        className="h-4 w-4"
        onClick={(e) => {
          e.stopPropagation()
          deleteDoc(notificationRef!)
          updateNotifications()
        }}
        title="Dismiss"
      />
    </a>
  )
}
