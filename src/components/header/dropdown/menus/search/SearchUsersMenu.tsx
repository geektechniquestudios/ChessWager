import { useState } from "react"
import { SearchArea } from "./SearchArea"
import { UsersList } from "./UsersList"
import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { SearchToggle } from "./SearchToggle"
import { MenuLine } from "../../models/MenuLine"

export const SearchUsersMenu: React.FC = ({}) => {
  const [search, setSearch] = useState("")
  const [friendsOrEveryOne, setFriendsOrEveryOne] = useState<
    "friends" | "everyone"
  >("everyone")
  return (
    <Menu
      menuItems={[
        <DropdownArea
          content={<SearchArea search={search} setSearch={setSearch} />}
        />,
        <SearchToggle
          friendsOrEveryone={friendsOrEveryOne}
          setFriendsOrEveryone={setFriendsOrEveryOne}
        />,
        <MenuLine />,
        <DropdownArea
          content={
            <>
              {search.length > 2 || friendsOrEveryOne === "friends" ? (
                <UsersList
                  search={search}
                  friendsOrEveryone={friendsOrEveryOne}
                />
              ) : (
                <div className="h-72" />
              )}
            </>
          }
        />,
      ]}
      thisMenu={"searchUsers"}
    />
  )
}
