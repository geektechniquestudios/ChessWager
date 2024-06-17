import { AuthState } from "../../containers/AuthState"
import { DropdownState } from "../../containers/DropdownState"
import { UserMenuState } from "../../containers/UserMenuState"

interface Props {
  photoURL: string
  userName: string
  uid: string
}

export const UserTitle: React.FC<Props> = ({ photoURL, userName, uid }) => {
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { user } = AuthState.useContainer()
  const disabledStyle = !user ? "pointer-events-none" : ""
  return (
    <a
      className={`${disabledStyle} float-left mr-1 flex items-center gap-1`}
      onClick={() => {
        setClickedUserById(uid)
        openDropdownToMenu("clickedUser")
      }}
    >
      <img
        src={photoURL}
        title={userName}
        className="h-4 w-4 rounded-full"
      />
      <p className="font-bold text-stone-900 hover:underline dark:text-stone-200">{`${userName}:`}</p>
    </a>
  )
}
