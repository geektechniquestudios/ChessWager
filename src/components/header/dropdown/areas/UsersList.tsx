import { useCollectionData } from "react-firebase-hooks/firestore"
import { FirebaseError } from "firebase/app"
import { UserListItem } from "./UserListItem"
import { User } from "../../../../interfaces/User"
import "../../../../style/scrollbar.scss"

import { firebaseApp } from "../../../../config"
import { collection, DocumentData, FirestoreError, getFirestore, query, where } from "firebase/firestore"
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types"

const db = getFirestore(firebaseApp)
interface Props {
  search: string
}

export const UsersList: React.FC<Props> = ({ search }) => {
  const usersCollectionRef = collection(db, "users")
  const q = query(
    usersCollectionRef,
    where("searchableDisplayName", ">=", search.toLowerCase()),
    where("searchableDisplayName", "<=", search.toLowerCase() + "\uf8ff"),
  )

  const [users]: [
    Data<DocumentData, keyof User, keyof User>[] | undefined,
    boolean,
    FirestoreError | undefined,
  ] | any = useCollectionData(q, { idField: "id" })

  return (
    <div
      className="scrollbar-dropdown h-60 w-full overflow-y-auto overflow-x-hidden ml-0.5"
      style={{ direction: "rtl" }}
    >
      <div style={{ direction: "ltr" }}>
        {users?.map((user: User) => (
          <UserListItem key={user.id} {...user} />
        ))}
      </div>
    </div>
  )
}
