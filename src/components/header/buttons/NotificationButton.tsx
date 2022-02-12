import { RiNotification3Line } from "react-icons/ri"
import { Auth } from "../../containers/Auth"

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
}

export const NotificationButton: React.FC<Props> = ({
  setOpen,
  setActiveMenu,
}) => {
  const { user } = Auth.useContainer()
  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button border-none hover:bg-stone-300 mr-1 h-9"
            title="Notifications"
            onClick={() => {
              setOpen(true)
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
