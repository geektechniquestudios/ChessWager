import "../../../../../style/scrollbar.scss"
import { useState } from "react"
import { Auth } from "../../../../containers/Auth"
import { collection, doc, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"
import { Friend } from "../../../../../interfaces/Friend"
import { FriendItem } from "./FriendItem"
const db = getFirestore(firebaseApp)

export const FriendsList: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const userFriendsRef = collection(userRef, "friends")
  const [friends, isLoading] = useCollectionDataOnce<Friend[] | any>(
    userFriendsRef,
    {
      idField: "id",
    },
  )
  return (
    <>
      {!isLoading ? (
        friends?.length ?? 0 > 0 ? (
          <div
            className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
            style={{ direction: "rtl" }}
          >
            {friends!.map((friend: Friend) => (
              <FriendItem {...friend} />
            ))}
          </div>
        ) : (
          <div className="h-72 mt-10 w-64 justify-center flex dark:text-stone-400 text-stone-400">
            No friends yet
          </div>
        )
      ) : (
        <div className="h-72 w-full" />
      )}
    </>
  )
}
