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
    <>
      <a
        href="#"
        className={`flex w-8 h-8 m-2 align-middle rounded-full bg-secondary dark:bg-secondary-dark hover:bg-stone-500 dark:hover:bg-stone-600 ${pointerEvents}`}
        onClick={() => {
          setActiveMenu("main")
          setIsDropdownOpen(!isDropdownOpen)
        }}
      >
        {user ? (
          <img
            src={photoURL!}
            alt=""
            className="w-8 h-8 color-shift rounded-full hover:border-teal-700 border-stone-900 dark:border-stone-200 border-1"
          />
        ) : (
          <BiUserCircle className="w-8 h-8" />
        )}
      </a>
      {isDropdownOpen && <DropdownMenu />}
    </>
  )
}
