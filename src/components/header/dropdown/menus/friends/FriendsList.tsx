import "../../../../../style/scrollbar.scss"
import { Auth } from "../../../../containers/Auth"
import {
  collection,
  CollectionReference,
  doc,
  getFirestore,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../../firestore.config"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"
import { Friend } from "../../../../../interfaces/Friend"
import { FriendItem } from "./FriendItem"
const db = getFirestore(firebaseApp)

export const FriendsList: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const userFriendsRef = collection(
    userRef,
    "friends",
  ) as CollectionReference<Friend>
  const [friends, isLoading] = useCollectionDataOnce<Friend>(userFriendsRef, {
    idField: "id",
  })
  return (
    <>
      {!isLoading ? (
        (friends?.length ?? 0) > 0 ? (
          <div
            className="scrollbar-dropdown ml-0.5 h-72 w-full overflow-y-auto overflow-x-hidden"
            style={{ direction: "rtl" }}
          >
            {friends!.map((friend: Friend) => (
              <FriendItem {...friend} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex h-72 w-64 justify-center text-stone-400 dark:text-stone-400">
            No friends yet
          </div>
        )
      ) : (
        <div className="h-72 w-full" />
      )}
    </>
  )
}
