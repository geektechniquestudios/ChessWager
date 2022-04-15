import { useState } from "react"
import { SearchArea } from "./SearchArea"
import { UsersList } from "./UsersList"
import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"
import { DropdownButton } from "../persona/buttons/DropdownButton"
import { FiUsers } from "react-icons/fi"
import { RiUserHeartLine } from "react-icons/ri"
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
          key={0}
          content={<SearchArea search={search} setSearch={setSearch} />}
        />,
        <SearchToggle
          friendsOrEveryone={friendsOrEveryOne}
          setFriendsOrEveryone={setFriendsOrEveryOne}
          key={1}
        />,
        <MenuLine key={2} />,
        <DropdownArea
          key={3}
          content={
            <>
              {search.length > 2 ? (
                <UsersList search={search} friendsOrEveryone={friendsOrEveryOne} />
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
