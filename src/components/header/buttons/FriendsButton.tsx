import { FiUsers } from "react-icons/fi"
import { Auth } from "../../containers/Auth"

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
}

export const FriendsButton: React.FC<Props> = ({ setOpen, setActiveMenu }) => {
  const { user } = Auth.useContainer()
  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button header-button"
            title="Friends"
            onClick={() => {
              setOpen(true)
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
