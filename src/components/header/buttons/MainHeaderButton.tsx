import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"

interface Props {
  title: string
  openToMenu: string
  icon: React.ReactNode
  onClick?: () => void
}

export const MainHeaderButton: React.FC<Props> = ({
  title,
  openToMenu,
  icon,
  onClick,
}) => {
  const { user } = Auth.useContainer()
  const { setIsDropdownOpen, setActiveMenu, activeMenu } =
    DropdownState.useContainer()
  const activeStyle = activeMenu === openToMenu ? "bg-stone-700" : ""
  return (
    <>
      {user && (
        <div className="flex flex-col justify-center align-middle">
          <button
            className={`cw-button header-button ${activeStyle}`}
            title={title}
            onClick={() => {
              setIsDropdownOpen(true)
              setActiveMenu(openToMenu)
              onClick && onClick()
            }}
          >
            {icon}
          </button>
        </div>
      )}
    </>
  )
}
