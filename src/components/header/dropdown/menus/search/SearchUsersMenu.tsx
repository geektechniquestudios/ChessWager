import { useState } from "react"
import { SearchArea } from "./SearchArea"
import { UsersList } from "./UsersList"
import { DropdownArea } from "../../models/DropdownArea"
import { Menu } from "../../models/Menu"

export const SearchUsersMenu: React.FC = ({}) => {
  const [search, setSearch] = useState("")

  return (
    <Menu
      menuItems={[
        <DropdownArea
          key={2}
          content={<SearchArea search={search} setSearch={setSearch} />}
        />,
        <DropdownArea
          key={3}
          content={
            <>
              {search.length > 2 ? (
                <UsersList search={search} />
              ) : (
                <div className="h-60" />
              )}
            </>
          }
        />,
      ]}
      thisMenu={"searchUsers"}
    />
  )
}
