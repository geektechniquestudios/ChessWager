import { LinearProgress } from "@mui/material"
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import InfiniteScroll from "react-infinite-scroll-component"
import { Notification } from "../../../../../interfaces/Notification"
import { AuthState } from "../../../../../containers/AuthState"
import { NotificationItem } from "./NotificationItem"

export const NotificationsList: React.FC = ({}) => {
  const { auth, db } = AuthState.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const notificationsCollection = collection(userRef, "notifications")

  const [hasMore, setHasMore] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timestamp] = useState<Timestamp>(Timestamp.now())

  const q = query(
    notificationsCollection,
    orderBy("createdAt", "desc"),
    where("createdAt", ">", timestamp),
  ) as Query<Notification>

  const [liveNotifications] =
    useCollectionData<Notification>(q, { idField: "id" }) ?? []

  const fullNotifications = [
    ...(liveNotifications ?? []),
    ...(notifications ?? []),
  ]

  const loadMoreNotifications = async () => {
    const amountToLoad = 7
    const lastVisible =
      notifications?.[notifications.length - 1]?.createdAt ?? timestamp

    const q2 = query(
      notificationsCollection,
      orderBy("createdAt", "desc"),
      limit(amountToLoad),
      startAfter(lastVisible),
    ) as Query<Notification>

    const oldNotifications = (await getDocs(q2)).docs.map((doc) => {
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

  useEffect(() => {
    if (notifications.length < 1 && (liveNotifications?.length ?? 0) < 1)
      loadMoreNotifications()
  }, [notifications])

  return (
    <div
      className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden"
      style={{ direction: "rtl" }}
      id="notifications-scroll-div"
    >
      {(fullNotifications?.length ?? 0) > 0 ? (
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
            {fullNotifications?.map((notification) => (
              <NotificationItem
                notification={notification}
                key={notification.id}
                setNotifications={setNotifications}
                notifications={notifications}
                openToMenu={notification.openToMenu}
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
