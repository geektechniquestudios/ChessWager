import { RiUserHeartLine } from "react-icons/ri"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const FollowButton: React.FC<Props> = ({ id }) => {
  const follow = () => {}
  return (
    <DropdownButton
      content={<RiUserHeartLine />}
      onClick={follow}
      title="Follow"
    />
  )
}
