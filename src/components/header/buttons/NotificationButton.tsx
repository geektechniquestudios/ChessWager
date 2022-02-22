import { RiNotification3Line } from "react-icons/ri"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"

export const NotificationButton: React.FC = () => {
  const { user } = Auth.useContainer()
  const { openDropdownToMenu } = DropdownState.useContainer()

  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button header-button"
            title="Notifications"
            onClick={() => {
              openDropdownToMenu("notifications")
            }}
          >
            <RiNotification3Line size="21" className="m-2" />
          </button>
        </div>
      )}
    </>
  )
}
