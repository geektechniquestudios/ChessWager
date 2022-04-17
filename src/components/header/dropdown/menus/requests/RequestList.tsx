import { collection, doc, getFirestore } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { firebaseApp } from "../../../../../config"
import { FriendRequest } from "../../../../../interfaces/FriendRequest"
import { Auth } from "../../../../containers/Auth"
import { RequestItem } from "./RequestItem"

const db = getFirestore(firebaseApp)

interface Props {}

export const RequestList: React.FC<Props> = ({}) => {
  const { auth } = Auth.useContainer()
  const targetUserRef = doc(db, "users", auth.currentUser!.uid)
  const requestsCollection = collection(targetUserRef, "requests")
  const [requests, isLoading] =
    useCollectionData<FriendRequest[] | any>(requestsCollection, {
      idField: "id",
    }) ?? []
  return (
    <>
      {!isLoading ? (
        requests?.length ?? 0 > 0 ? (
          <div
            className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
            style={{ direction: "rtl" }}
          >
            {requests?.map((request: FriendRequest) => (
              <RequestItem {...request} key={request.id} />
            ))}
          </div>
        ) : (
          <div className="h-72 mt-10 w-64 justify-center flex dark:text-stone-400 text-stone-400">
            No friend requests yet
          </div>
        )
      ) : (
        <div className="h-72 w-full" />
      )}
    </>
  )
}
