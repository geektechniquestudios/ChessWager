import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { SearchArea } from "../../areas/SearchArea"
import { UsersList } from "../../areas/UsersList"
import { DropdownArea } from "../../DropdownArea"
import { DropdownItem } from "../../DropdownItem"
import { Menu } from "../../Menu"
import { MenuLine } from "../../MenuLine"

export const SearchUsers: React.FC = ({}) => {
  const [search, setSearch] = useState("")

  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="main"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Search Users"
        />,
        <MenuLine key={1} />,
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
