import { RiUserFollowLine } from "react-icons/ri"
import { DropdownButton } from "./DropdownButton"

interface Props {
  onClick: () => void
}

export const CancelPendingRequestButton: React.FC<Props> = ({ onClick }) => {
  const cancelRequest = () => {}
  return (
    <DropdownButton
      content={<RiUserFollowLine />}
      onClick={() => {
        cancelRequest()
        onClick()
      }}
      title="Cancel Request"
    />
  )
}
