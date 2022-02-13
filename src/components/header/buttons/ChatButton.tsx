import { RiChat2Line } from "react-icons/ri"
import { Auth } from "../../containers/Auth"

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
}

export const ChatButton: React.FC<Props> = ({setOpen, setActiveMenu}) => {
  const { user } = Auth.useContainer()
  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button header-button"
            title="Messages"
            onClick={() => {
              setOpen(true)
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
