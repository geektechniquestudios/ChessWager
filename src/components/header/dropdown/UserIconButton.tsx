/* eslint-disable jsx-a11y/anchor-is-valid */
import { DropdownState } from "../../containers/DropdownState"

interface Props {
  icon: React.ReactNode
  children: React.ReactNode
}

export const UserIconButton: React.FC<Props> = ({ icon, children }) => {
  const { isDropdownOpen, setIsDropdownOpen, setActiveMenu } =
    DropdownState.useContainer()

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
        {icon}
      </a>
      {isDropdownOpen && children}
    </>
  )
}
