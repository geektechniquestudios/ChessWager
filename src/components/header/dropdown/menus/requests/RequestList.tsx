import {
  collection,
  CollectionReference,
  doc,
  getFirestore,
} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { firebaseApp } from "../../../../../../firestore.config"
import { FriendRequest } from "../../../../../interfaces/FriendRequest"
import { Auth } from "../../../../containers/Auth"
import { RequestItem } from "./RequestItem"

const db = getFirestore(firebaseApp)

interface Props {}

export const RequestList: React.FC<Props> = ({}) => {
  const { auth } = Auth.useContainer()
  const targetUserRef = doc(db, "users", auth.currentUser!.uid)
  const requestsCollection = collection(
    targetUserRef,
    "requests",
  ) as CollectionReference<FriendRequest>
  const [requests, isLoading] =
    useCollectionData<FriendRequest>(requestsCollection, {
      idField: "id",
    }) ?? []
  return (
    <>
      {!isLoading ? (
        (requests?.length ?? 0) > 0 ? (
          <div
            className="scrollbar-dropdown ml-0.5 h-72 w-full overflow-y-auto overflow-x-hidden"
            style={{ direction: "rtl" }}
            id="requests"
          >
            {requests?.map((request: FriendRequest) => (
              <RequestItem {...request} key={request.id} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex h-72 w-64 justify-center text-stone-400 dark:text-stone-400">
            No friend requests yet
          </div>
        )
      ) : (
        <div className="h-72 w-full" />
      )}
    </>
  )
}
