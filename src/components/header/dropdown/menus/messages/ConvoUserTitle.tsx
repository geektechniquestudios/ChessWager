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
  const { goToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className="float-left mr-1 flex gap-1"
      onClick={() => {
        setClickedUserById(uid)
        goToMenu("clickedUser")
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
