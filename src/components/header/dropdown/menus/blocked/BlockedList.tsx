import { collection, doc, getFirestore } from "firebase/firestore"
import { useState } from "react"
import {
  useCollectionData,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore"
import { firebaseApp } from "../../../../../config"
import { BlockedUser } from "../../../../../interfaces/BlockedUser"
import { Auth } from "../../../../containers/Auth"
import { BlockedUserItem } from "./BlockedUserItem"

const db = getFirestore(firebaseApp)

interface Props {}

export const BlockedList: React.FC<Props> = ({}) => {
  const { auth } = Auth.useContainer()
  const blockedCollection = collection(
    doc(db, "users", auth.currentUser!.uid),
    "blocked",
  )
  const [blockedUsers] = useCollectionData<BlockedUser[] | any>(
    blockedCollection,
    { idField: "id" },
  )
  return (
    <div>
      {blockedUsers?.length ?? 0 > 0 ? (
        <div
          className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
          style={{ direction: "rtl" }}
        >
          {blockedUsers?.map(({ userName, photoURL, id }: BlockedUser) => (
            <BlockedUserItem
              userName={userName}
              photoURL={photoURL}
              uid={id}
              key={id}
            />
          ))}
        </div>
      ) : (
        <div className="h-72 mt-10 w-64 justify-center flex dark:text-stone-400 text-stone-400">
          No blocked users
        </div>
      )}
    </div>
  )
}
