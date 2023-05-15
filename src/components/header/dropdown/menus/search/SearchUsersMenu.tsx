import { useState } from "react"
import { Menu } from "../../models/Menu"
import { MenuLine } from "../../models/MenuLine"
import { SearchArea } from "./SearchArea"
import { SearchToggle } from "./SearchToggle"
import { UsersList } from "./UsersList"

export const SearchUsersMenu: React.FC = ({}) => {
  const [search, setSearch] = useState("")
  const [friendsOrEveryOne, setFriendsOrEveryOne] = useState<
    "friends" | "everyone"
  >("everyone")
  return (
    <Menu
      menuItems={[
        <SearchArea search={search} setSearch={setSearch} />,
        <SearchToggle
          friendsOrEveryone={friendsOrEveryOne}
          setFriendsOrEveryone={setFriendsOrEveryOne}
        />,
        <MenuLine />,
        <>
          {search.length > 2 || friendsOrEveryOne === "friends" ? (
            <UsersList search={search} friendsOrEveryone={friendsOrEveryOne} />
          ) : (
            <div className="h-72" />
          )}
        </>,
      ]}
      thisMenu={"searchUsers"}
    />
  )
}
