import { FiUsers } from "react-icons/fi"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"

export const FriendsButton: React.FC = () => {
  const { user } = Auth.useContainer()
  const { setIsDropdownOpen, setActiveMenu } = DropdownState.useContainer()

  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button header-button"
            title="Friends"
            onClick={() => {
              setIsDropdownOpen(true)
              setActiveMenu("settings")
            }}
          >
            <FiUsers size="21" className="m-2" />
          </button>
        </div>
      )}
    </>
  )
}
