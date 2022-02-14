import { RiChat2Line } from "react-icons/ri"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"

export const ChatButton: React.FC = () => {
  const { user } = Auth.useContainer()
  const { setIsDropdownOpen, setActiveMenu } = DropdownState.useContainer()
  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button header-button"
            title="Messages"
            onClick={() => {
              setIsDropdownOpen(true)
              setActiveMenu("settings")
            }}
          >
            <RiChat2Line size="21" className="m-2" />
          </button>
        </div>
      )}
    </>
  )
}
