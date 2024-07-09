import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { useState } from "react"
import { BsX } from "react-icons/bs"
import { Bet } from "../../../../../interfaces/Bet"
import { Notification } from "../../../../../interfaces/Notification"
import { AuthState } from "../../../../../containers/AuthState"
import { DropdownState } from "../../../../../containers/DropdownState"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { DropdownButton } from "../persona/buttons/DropdownButton"

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
  const { text, openToMenu, clickedUserId, isRead, id, betId } = notification
  const { goToMenu, setBet } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { auth, db } = AuthState.useContainer()

  const [isHovered, setIsHovered] = useState<boolean>(false)

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
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${unreadStyle} color-shift flex h-14 w-full items-center justify-between gap-1 px-4 text-stone-900 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200`}
      style={{ direction: "ltr" }}
      onClick={() => {
        clickedUserId && setClickedUserById(clickedUserId)
        if (openToMenu) {
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
      <p className="pointer-events-auto line-clamp-3 text-left text-xs">
        {text}
      </p>
      <div className="flex w-9 justify-end">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DropdownButton
              content={<BsX />}
              className="!hover:bg-red-200 !dark:hover:bg-red-700 h-4 w-4"
              onClick={(e) => {
                e.stopPropagation()
                deleteDoc(notificationRef!)
                updateNotifications()
              }}
              title="Dismiss"
            />
          </motion.div>
        )}
      </div>
    </button>
  )
}
