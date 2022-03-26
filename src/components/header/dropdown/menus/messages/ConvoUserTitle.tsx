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
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserId } = UserMenuState.useContainer()
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className="flex gap-1 mr-1 float-left"
      onClick={() => {}}
    >
      <img
        src={photoURL}
        alt=""
        title={userName}
        className="w-4 h-4 rounded-full"
      />
      <p className="text-xs font-bold text-stone-900 dark:text-stone-300">{`${userName}:`}</p>
    </a>
  )
}
