import { Auth } from "../containers/Auth"
import { DropdownState } from "../containers/DropdownState"
import { UserMenuState } from "../containers/UserMenuState"

interface Props {
  photoURL: string
  userName: string
  uid: string
}

export const UserTitle: React.FC<Props> = ({ photoURL, userName, uid }) => {
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { user } = Auth.useContainer()
  const disabledStyle = !user ? "pointer-events-none" : ""
  return (
    <a
      className={`float-left mr-1 flex gap-1 ${disabledStyle}`}
      onClick={() => {
        setClickedUserById(uid)
        openDropdownToMenu("clickedUser")
      }}
    >
      <img
        src={photoURL}
        alt=""
        title={userName}
        className="h-4 w-4 rounded-full"
      />
      <p className="text-xs font-bold text-stone-900 hover:underline dark:text-stone-200">{`${userName}:`}</p>
    </a>
  )
}
