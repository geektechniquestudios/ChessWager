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
    <a
      className="float-left mr-1 grid w-6 shrink-0 place-content-center"
      onClick={() => {
        setClickedUserById(uid)
        goToMenu("clickedUser")
      }}
    >
      <img
        src={photoURL}
        alt=""
        title={userName}
        className="h-5 w-5 rounded-full"
      />
    </a>
  )
}
