import { DropdownState } from "../../../../containers/DropdownState"
import { UserMenuState } from "../../../../containers/UserMenuState"

interface Props {
  photoURL: string
  userName: string
  uid: string
}

export const ConvoUserTitle: React.FC<Props> = ({
  photoURL,
  userName,
  uid,
}) => {
  const { openDropdownToMenu, setActiveMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className="flex gap-1 mr-1 float-left"
      onClick={() => {
        setClickedUserById(uid)
        setActiveMenu("clickedUser")
      }}
    >
      <img
        src={photoURL}
        alt=""
        title={userName}
        className="w-4 h-4 rounded-full"
      />
      <p className="text-xs font-bold text-stone-900 dark:text-stone-300 hover:underline">{`${userName}:`}</p>
    </a>
  )
}
