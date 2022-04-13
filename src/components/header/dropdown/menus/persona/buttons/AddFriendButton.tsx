import { RiUserAddLine } from "react-icons/ri"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
  onClick: () => void
}

export const AddFriendButton: React.FC<Props> = ({ id, onClick }) => {
  const addFriend = () => {}
  return (
    <DropdownButton
      content={<RiUserAddLine />}
      onClick={() => {
        addFriend()
        onClick()
      }}
      title="Add Friend"
    />
  )
}
