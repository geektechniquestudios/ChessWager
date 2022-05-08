import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import "../../../style/buttons.scss"

interface Props {
  id?: string
  title: string
  openToMenu: string
  icon: React.ReactNode
  onClick?: () => void
  authRequired?: boolean
}

export const MainHeaderButton: React.FC<Props> = ({
  title,
  openToMenu,
  icon,
  onClick,
  authRequired = false,
  id,
}) => {
  const { user } = Auth.useContainer()
  const { setIsDropdownOpen, setActiveMenu, activeMenu } =
    DropdownState.useContainer()
  const activeStyle =
    activeMenu === openToMenu ? "bg-stone-300 dark:bg-stone-700" : ""
  return (
    <>
      {(user || !authRequired) && (
        <button
          id={id}
          className={`w-9 h-9 rounded-md grid place-content-center color-shift clickable border-none hover:bg-stone-300 dark:hover:bg-stone-700 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white border-stone-800 dark:border-stone-300 text-stone-800 dark:text-stone-300 ${activeStyle}`}
          title={title}
          onClick={() => {
            setIsDropdownOpen(true)
            setActiveMenu(openToMenu)
            onClick && onClick()
          }}
        >
          {icon}
        </button>
      )}
    </>
  )
}
