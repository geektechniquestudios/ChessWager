import { collection, doc, Query } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { BlockedUser } from "../../../../../interfaces/BlockedUser"
import { Auth } from "../../../../containers/Auth"
import { BlockedUserItem } from "./BlockedUserItem"

interface Props {}

export const BlockedList: React.FC<Props> = ({}) => {
  const { auth, db } = Auth.useContainer()
  const blockedCollection = collection(
    doc(db, "users", auth.currentUser!.uid),
    "blocked",
  ) as Query<BlockedUser>
  const [blockedUsers] = useCollectionData<BlockedUser>(blockedCollection, {
    idField: "id",
  })
  return (
    <div>
      {blockedUsers?.length ?? 0 > 0 ? (
        <div
          className="scrollbar-dropdown ml-0.5 h-72 w-full overflow-y-auto overflow-x-hidden"
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
        <div className="mt-10 flex h-72 w-64 justify-center text-stone-400 dark:text-stone-400">
          No blocked users
        </div>
      )}
    </div>
  )
}
