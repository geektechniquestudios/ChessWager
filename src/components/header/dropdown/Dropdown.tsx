/* eslint-disable jsx-a11y/anchor-is-valid */
import { BiUserCircle } from "react-icons/bi"
import { Auth } from "../../containers/Auth"
import { DropdownState } from "../../containers/DropdownState"
import { DropdownMenu } from "./DropdownMenu"

export const Dropdown: React.FC = () => {
  const { isDropdownOpen, setIsDropdownOpen, setActiveMenu } =
    DropdownState.useContainer()

  const { user, auth } = Auth.useContainer()
  const { photoURL } = auth.currentUser || { uid: "", photoURL: "" }
  const pointerEvents = isDropdownOpen ? "pointer-events-none" : ""

  return (
    <div className="flex flex-col justify-center">
      <a
        href="#"
        className={`w-7 h-7 m-2 rounded-full bg-stone-500 dark:bg-stone-600 hover:bg-stone-500 dark:hover:bg-stone-600 ${pointerEvents}`}
        onClick={() => {
          setActiveMenu("main")
          setIsDropdownOpen(!isDropdownOpen)
        }}
      >
        {user ? (
          <img
            src={photoURL!}
            alt=""
            className="w-7 h-7 rounded-full"
          />
        ) : (
          <BiUserCircle className="w-7 h-7 color-shift text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800" />
        )}
      </a>
      {isDropdownOpen && <DropdownMenu />}
    </div>
  )
}
