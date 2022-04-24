import "../../../../../style/scrollbar.scss"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { UsersListItem } from "./UsersListItem"
import type { User } from "../../../../../interfaces/User"
import { firebaseApp } from "../../../../../config"
import {
  collection,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore"
import { UserDataState } from "../../../../containers/UserDataState"
import { Auth } from "../../../../containers/Auth"

const db = getFirestore(firebaseApp)
interface Props {
  search: string
  friendsOrEveryone: "friends" | "everyone"
}

export const UsersList: React.FC<Props> = ({ search, friendsOrEveryone }) => {
  const usersCollectionRef = collection(db, "users")
  const { auth } = Auth.useContainer()
  const allUsersQuery = query(
    usersCollectionRef,
    where("searchableDisplayName", ">=", search.toLowerCase()),
    where("searchableDisplayName", "<=", search.toLowerCase() + "\uf8ff"),
    where(
      "searchableDisplayName",
      "!=",
      auth.currentUser?.displayName?.toLocaleLowerCase() ?? "",
    ),
    limit(10),
  )

  const friendsOnlyQuery = query(
    usersCollectionRef,
    where("friends", "array-contains", auth.currentUser!.uid),
    limit(10),
  )

  const [users] = useCollectionData<[User[]] | any>(
    friendsOrEveryone === "everyone" ? allUsersQuery : friendsOnlyQuery,
  )
  const { userData } = UserDataState.useContainer()
  return (
    <div
      className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
      style={{ direction: "rtl" }}
    >
      <div style={{ direction: "ltr" }}>
        {users
          ?.filter(
            (user: User) =>
              (!userData?.blockedUsers.includes(user.id) ?? true) &&
              (friendsOrEveryone === "friends"
                ? user.searchableDisplayName.startsWith(search)
                : true),
          )
          .sort((a: User, b: User) => -(a.displayName < b.displayName))
          .map((user: User) => (
            <UsersListItem key={user.id} {...user} />
          ))}
      </div>
    </div>
  )
}
