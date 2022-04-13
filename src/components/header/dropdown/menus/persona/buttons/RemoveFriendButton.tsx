import { RiUserUnfollowLine } from "react-icons/ri"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const RemoveFriendButton: React.FC<Props> = ({ id }) => {
  const removeFriend = () => {}
  return (
    <DropdownButton
      content={<RiUserUnfollowLine />}
      onClick={removeFriend}
      title="Remove Friend"
    />
  )
}
