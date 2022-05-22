import { Auth } from "../containers/Auth"
import { DropdownState } from "../containers/DropdownState"
import { UserMenuState } from "../containers/UserMenuState"

interface Props {
  photoURL: string
  userName: string
  uid: string
}

export const UserTitle: React.FC<Props> = ({ photoURL, userName, uid }) => {
  const { openDropdownToMenu, menuStack, setMenuStack } =
    DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { user } = Auth.useContainer()
  const disabledStyle = !user ? "pointer-events-none" : ""
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className={`float-left mr-1 flex gap-1 ${disabledStyle}`}
      onClick={() => {
        setClickedUserById(uid)
        openDropdownToMenu("clickedUser")
        setMenuStack([...menuStack, "clickedUser"])
      }}
    >
      <img
        src={photoURL}
        alt=""
        title={userName}
        className="h-4 w-4 rounded-full"
      />
      <p className="text-xs font-bold text-stone-900 hover:underline dark:text-stone-300">{`${userName}:`}</p>
    </a>
  )
}
