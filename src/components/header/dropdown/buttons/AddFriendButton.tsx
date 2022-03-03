import { RiUserAddLine } from "react-icons/ri"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const AddFriendButton: React.FC<Props> = ({ id }) => {
  const addFriend = () => {}
  return (
    <DropdownButton
      content={<RiUserAddLine />}
      onClick={addFriend}
      title="Add Friend"
    />
  )
}
