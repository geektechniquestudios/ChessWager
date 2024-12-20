import { collection, limit, Query, query, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import type { User } from "../../../../../interfaces/User"
import { AuthState } from "../../../../../containers/AuthState"
import { UserDataState } from "../../../../../containers/UserDataState"
import { UsersListItem } from "./UsersListItem"

interface Props {
  search: string
  friendsOrEveryone: "friends" | "everyone"
}

export const UsersList: React.FC<Props> = ({ search, friendsOrEveryone }) => {
  const { auth, db } = AuthState.useContainer()

  const usersCollectionRef = collection(db, "users")
  const allUsersQuery = query(
    usersCollectionRef,
    where("searchableDisplayName", ">=", search.toLowerCase()),
    where("searchableDisplayName", "<=", search.toLowerCase() + "\uf8ff"),
    limit(10),
  )

  const friendsOnlyQuery = query(
    usersCollectionRef,
    where("friends", "array-contains", auth.currentUser?.uid ?? ""),
    limit(10),
  )

  const [users] = useCollectionData<User>(
    (friendsOrEveryone === "everyone"
      ? allUsersQuery
      : friendsOnlyQuery) as Query<User>,
  )
  const { userData } = UserDataState.useContainer()
  return (
    <div
      className="scrollbar-dropdown h-72 overflow-y-auto"
      style={{ direction: "rtl" }}
    >
      <div style={{ direction: "ltr" }} id="search-users-results">
        {users
          ?.filter(
            (user: User) =>
              !userData?.blockedUsers.includes(user.id) &&
              user.id !== auth.currentUser?.uid &&
              (friendsOrEveryone === "friends"
                ? user.searchableDisplayName.startsWith(search)
                : true),
          )
          .sort((a: User, b: User) => -(a.displayName < b.displayName))
          .map((user: User) => <UsersListItem key={user.id} {...user} />)}
      </div>
    </div>
  )
}
