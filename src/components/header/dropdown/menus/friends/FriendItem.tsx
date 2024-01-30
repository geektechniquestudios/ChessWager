import { Friend } from "../../../../../interfaces/Friend"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { DropdownItem } from "../../models/DropdownItem"

export const FriendItem: React.FC<Friend> = ({
  id,
  userName,
  photoURL,
  createdAt,
}) => {
  const { setClickedUserById } = UserMenuState.useContainer()
  return (
    <div style={{ direction: "ltr" }}>
      <DropdownItem
        leftIcon={
          <img
            src={photoURL}
            className="grid h-6 w-6 place-content-center rounded-full"
          />
        }
        text={userName}
        onClick={() => {
          setClickedUserById(id)
        }}
        goToMenu=""
      />
    </div>
  )
}
