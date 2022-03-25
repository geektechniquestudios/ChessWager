import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"

interface Props {
  title: string
  openToMenu: string
  icon: React.ReactNode
}

export const MainHeaderButton: React.FC<Props> = ({
  title,
  openToMenu,
  icon,
}) => {
  const { user } = Auth.useContainer()
  const { setIsDropdownOpen, setActiveMenu } = DropdownState.useContainer()
  return (
    <>
      {user && (
        <div className="flex flex-col justify-center">
          <button
            className="cw-button header-button"
            title={title}
            onClick={() => {
              setIsDropdownOpen(true)
              setActiveMenu(openToMenu)
            }}
          >
            {icon}
          </button>
        </div>
      )}
    </>
  )
}
