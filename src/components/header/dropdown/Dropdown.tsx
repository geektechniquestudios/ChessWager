/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../style/dropdown.scss"

import { Auth } from "../../containers/Auth"
import { BiUserCircle } from "react-icons/bi"
import { UserIconButton } from "./UserIconButton"
import { DropdownMenu } from "./DropdownMenu"

export const Dropdown = () => {
  const { user, auth } = Auth.useContainer()
  const { photoURL } = auth.currentUser || { uid: "", photoURL: "" }

  return (
    <UserIconButton
      icon={
        user ? (
          <img
            src={photoURL!}
            alt=""
            className="w-8 h-8 color-shift rounded-full hover:border-teal-700 border-stone-900 dark:border-stone-200 border-1"
          />
        ) : (
          <BiUserCircle className="w-8 h-8" />
        )
      }
    >
      <DropdownMenu />
    </UserIconButton>
  )
}
