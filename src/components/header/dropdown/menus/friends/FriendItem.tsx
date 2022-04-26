import { Friend } from "../../../../../interfaces/Friend"
import { UserMenuState } from "../../../../containers/UserMenuState"
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
            className="w-6 h-6 rounded-full grid place-content-center"
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
