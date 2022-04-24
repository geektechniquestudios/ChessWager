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

const db = getFirestore(firebaseApp)

interface Props {
  text: string
  openToMenu?: string
  clickedUserId?: string
  createdAt: Timestamp
  isRead: boolean
  id: string
}

export const NotificationItem: React.FC<Props> = ({
  text,
  openToMenu,
  clickedUserId,
  createdAt,
  isRead,
  id,
}) => {
  const { setActiveMenu, menuStack, setMenuStack } =
    DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const notifications = collection(userRef, "notifications")
  const notificationRef = doc(notifications, id)
  const setAsRead = () => {
    updateDoc(notificationRef, {
      isRead: true,
    })
  }

  const unreadStyle = isRead ? "" : "bg-stone-300 dark:bg-stone-500"
  return (
    <a
      className={`h-12 w-64 px-4 flex items-center justify-between hover:bg-stone-200 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift ${unreadStyle}`}
      style={{ direction: "ltr" }}
      onClick={() => {
        clickedUserId && setClickedUserById(clickedUserId)
        if (openToMenu && openToMenu !== "") {
          setActiveMenu(openToMenu)
          const tempMenuStack = menuStack
          tempMenuStack.push(openToMenu)
          setMenuStack(tempMenuStack)
        }
        setAsRead()
      }}
    >
      <p className="text-xs pointer-events-auto text-left">{text}</p>
      <DropdownButton
        content={<BsX />}
        className="h-4 w-4"
        onClick={(e) => {
          e.stopPropagation()
          deleteDoc(notificationRef)
        }}
        title="Dismiss"
      />
    </a>
  )
}
