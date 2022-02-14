import { RiNotification3Line } from "react-icons/ri"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"

export const NotificationButton: React.FC = () => {
  const { user } = Auth.useContainer()
  const { setIsDropdownOpen, setActiveMenu } = DropdownState.useContainer()

  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button header-button"
            title="Notifications"
            onClick={() => {
              setIsDropdownOpen(true)
              setActiveMenu("settings")
            }}
          >
            <RiNotification3Line size="21" className="m-2" />
          </button>
        </div>
      )}
    </>
  )
}
