import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore"
import { BsX } from "react-icons/bs"
import { firebaseApp } from "../../../../../../firestore.config"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { DropdownButton } from "../persona/buttons/DropdownButton"
import { Notification } from "../../../../../interfaces/Notification"
import { Bet } from "../../../../../interfaces/Bet"

const db = getFirestore(firebaseApp)

interface Props {
  notification: Notification
  id?: string
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
  openToMenu?: string
}

export const NotificationItem: React.FC<Props> = ({
  notification,
  setNotifications,
  notifications,
}) => {
  const { text, openToMenu, clickedUserId, createdAt, isRead, id, betId } =
    notification
  const { goToMenu, setBet } = DropdownState.useContainer()
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

  const getBetById = async (betId: string): Promise<Bet> => {
    const gameDoc = doc(db, "lobby", betId) as DocumentReference<Bet>
    const bet = await getDoc(gameDoc)
    return bet.data()! as Bet
  }

  return (
    <a
      className={`${unreadStyle} color-shift flex h-12 w-64 items-center justify-between gap-1 px-4 text-stone-900 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200`}
      style={{ direction: "ltr" }}
      onClick={() => {
        clickedUserId && setClickedUserById(clickedUserId)
        if (openToMenu && openToMenu !== "") {
          if (betId)
            getBetById(betId)
              .then(setBet)
              .then(() => {
                goToMenu(openToMenu)
              })
          else goToMenu(openToMenu)
        }
        setAsRead()
      }}
    >
      <p className="pointer-events-auto line-clamp-2 text-left text-xs">
        {text}
      </p>
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
