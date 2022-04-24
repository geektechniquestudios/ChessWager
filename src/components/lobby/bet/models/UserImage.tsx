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
    <div className={`flex px-1 min-w-min gap-2 ${sideFlip}`}>
      <div className="flex flex-col justify-center align-middle">
        <div className="rounded-full w-8 h-8 grid place-content-center">
          <img src={photoURL} alt="" className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <a
        className={`text-xs mx-1 flex flex-col justify-center text-stone-900 dark:text-stone-300 hover:underline ${disabledStyle}`}
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