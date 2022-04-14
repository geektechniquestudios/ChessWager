import "../../../../../style/scrollbar.scss"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { UsersListItem } from "./UsersListItem"
import type { User } from "../../../../../interfaces/User"
import { firebaseApp } from "../../../../../config"
import { collection, getFirestore, query, where } from "firebase/firestore"
import { UserDataState } from "../../../../containers/UserDataState"

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

  const [users] = useCollectionData<[User[]] | any>(q)
  const { userData } = UserDataState.useContainer()
  return (
    <div
      className="scrollbar-dropdown h-60 w-full overflow-y-auto overflow-x-hidden ml-0.5"
      style={{ direction: "rtl" }}
    >
      <div style={{ direction: "ltr" }}>
        {users
          ?.filter((user) => !userData.blockedUsers.includes(user.uid))
          .map((user) => (
            <UsersListItem key={user.id} {...user} />
          ))}
      </div>
    </div>
  )
}
