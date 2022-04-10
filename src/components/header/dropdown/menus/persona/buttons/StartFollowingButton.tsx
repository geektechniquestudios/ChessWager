import { RiUserHeartLine } from "react-icons/ri"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const StartFollowingButton: React.FC<Props> = ({ id }) => {
  const startFollowing = () => {}
  return (
    <DropdownButton
      content={<RiUserHeartLine />}
      onClick={startFollowing}
      title="Start Following"
    />
  )
}
