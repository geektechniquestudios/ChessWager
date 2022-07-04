import { Auth } from "../../../containers/Auth"
import { DropdownState } from "../../../containers/DropdownState"
import { UserMenuState } from "../../../containers/UserMenuState"

interface Props {
  photoURL: string
  displayName: string
  isPlayer2?: boolean
  userId: string
}

export const UserImage: React.FC<Props> = ({
  photoURL,
  displayName,
  isPlayer2,
  userId,
}) => {
  const sideFlip = isPlayer2 ?? false ? "flex-row-reverse" : ""
  const { openDropdownToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { user } = Auth.useContainer()
  const disabledStyle = !user ? "pointer-events-none" : ""
  return (
    <div
      className={`flex gap-2 px-1 py-0.5 ${sideFlip} rounded-md border dark:border-stone-600 dark:bg-stone-800`}
    >
      <div className="flex flex-col justify-center align-middle">
        <div className="grid h-8 w-8 place-content-center rounded-full">
          <img src={photoURL} alt="" className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <a
        className={`mx-1 flex flex-col justify-center text-xs text-stone-900 hover:underline dark:text-stone-300 ${disabledStyle}`}
        onClick={(e) => {
          e.stopPropagation()
          setClickedUserById(userId)
          openDropdownToMenu("clickedUser")
        }}
      >
        {displayName}
      </a>
    </div>
  )
}
