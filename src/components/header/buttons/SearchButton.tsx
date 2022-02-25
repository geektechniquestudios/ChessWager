import { BiSearchAlt2 } from "react-icons/bi"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"

export const SearchButton: React.FC = () => {
  const { user } = Auth.useContainer()
  const { openDropdownToMenu } = DropdownState.useContainer()

  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button header-button"
            title="Search Users"
            onClick={() => {
              openDropdownToMenu("searchUsers")
            }}
          >
            <BiSearchAlt2 size="21" className="m-2" />
          </button>
        </div>
      )}
    </>
  )
}
