import "../../../../../style/scrollbar.scss"
import {
  collection,
  doc,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Notification } from "../../../../../interfaces/Notification"
import { NotificationItem } from "./NotificationItem"

const db = getFirestore(firebaseApp)

export const NotificationsList: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const notificationsCollection = collection(userRef, "notifications")
  const q = query(
    notificationsCollection,
    orderBy("createdAt", "desc"),
    limit(25),
  )
  const [notifications, isLoading] =
    useCollectionData<any | Notification>(q, {
      idField: "id",
    }) ?? []
  return (
    <>
      {!isLoading ? (
        notifications?.length ?? 0 > 0 ? (
          <div
            className="scrollbar-dropdown ml-0.5 h-72 w-full overflow-y-auto overflow-x-hidden"
            style={{ direction: "rtl" }}
          >
            <div style={{ direction: "ltr" }} id="notification-list">
              {notifications?.map((notification: Notification) => (
                <NotificationItem {...notification} key={notification.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 flex h-72 w-full justify-center text-stone-400 dark:text-stone-400">
            No notifications yet
          </div>
        )
      ) : (
        <div className="h-72 w-full" />
      )}
    </>
  )
}
