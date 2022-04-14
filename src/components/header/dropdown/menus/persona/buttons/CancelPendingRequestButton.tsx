import { RiUserFollowLine } from "react-icons/ri"
import { DropdownButton } from "./DropdownButton"

interface Props {
  onClick: () => void
  className?: string
}

export const CancelPendingRequestButton: React.FC<Props> = ({ onClick, className }) => {
  const cancelRequest = () => {}
  return (
    <DropdownButton
      className={className}
      content={<RiUserFollowLine />}
      onClick={() => {
        cancelRequest()
        onClick()
      }}
      title="Cancel Request"
    />
  )
}
