import { useState } from "react"
import { SearchArea } from "../../areas/SearchArea"
import { UsersList } from "../../areas/UsersList"
import { DropdownArea } from "../../DropdownArea"
import { Menu } from "../../Menu"

export const SearchUsers: React.FC = ({}) => {
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
