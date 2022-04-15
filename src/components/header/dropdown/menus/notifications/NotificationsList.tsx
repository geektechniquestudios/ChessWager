import "../../../../../style/scrollbar.scss"
import { useState } from "react"
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
import { DropdownItem } from "../../models/DropdownItem"

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
            className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
            style={{ direction: "rtl" }}
          >
            <div style={{ direction: "ltr" }}>
              {notifications
                // ?.sort((a, b) => a.createdAt - b.createdAt)
                ?.map((notification: Notification) => (
                  <NotificationItem {...notification} />
                ))}
            </div>
          </div>
        ) : (
          <div className="h-72 mt-10 w-full justify-center flex dark:text-stone-400 text-stone-400">
            No notifications yet
          </div>
        )
      ) : (
        <div className="h-72 w-full" />
      )}
    </>
  )
}
