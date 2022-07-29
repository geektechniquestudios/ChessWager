import "../../../../../style/scrollbar.scss"
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { Notification } from "../../../../../interfaces/Notification"
import { NotificationItem } from "./NotificationItem"
import InfiniteScroll from "react-infinite-scroll-component"
import { LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"

const db = getFirestore(firebaseApp)

export const NotificationsList: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const notificationsCollection = collection(userRef, "notifications")

  const [hasMore, setHasMore] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timestamp] = useState<Timestamp>(Timestamp.now())

  const loadMoreNotifications = async () => {
    const amountToLoad = 7
    const lastVisible =
      notifications?.[notifications.length - 1]?.createdAt ?? timestamp
    const q = query(
      notificationsCollection,
      orderBy("createdAt", "desc"),
      limit(amountToLoad),
      startAfter(lastVisible),
    ) as Query<Notification>

    const oldNotifications = (await getDocs(q)).docs.map((doc) => {
      let notification = doc.data() as Notification
      notification.id = doc.id
      return notification
    }) as Notification[]

    setNotifications([...(notifications ?? []), ...(oldNotifications ?? [])])
    if ((oldNotifications?.length ?? 0) < amountToLoad) setHasMore(false)
  }

  useEffect(() => {
    loadMoreNotifications().then(() => setIsLoading(false))
  }, [])

  return (
    <div
      className="scrollbar-dropdown ml-0.5 h-72 w-full overflow-y-auto overflow-x-hidden"
      style={{ direction: "rtl" }}
      id="notifications-scroll-div"
    >
      {(notifications?.length ?? 0) > 0 ? (
        <InfiniteScroll
          scrollThreshold="200px"
          scrollableTarget="notifications-scroll-div"
          dataLength={notifications?.length ?? 0}
          next={loadMoreNotifications}
          hasMore={hasMore}
          loader={notifications.length > 6 && <LinearProgress />}
          className="flex flex-col"
        >
          <div style={{ direction: "ltr" }} id="notification-list">
            {notifications?.map((notification, index) => (
              <NotificationItem
                {...notification}
                key={notification.id}
                setNotifications={setNotifications}
                notifications={notifications}
              />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="flex h-72 w-full justify-center pt-10 text-stone-400 dark:text-stone-400">
          {!isLoading && "No notifications yet"}
        </div>
      )}
    </div>
  )
}
