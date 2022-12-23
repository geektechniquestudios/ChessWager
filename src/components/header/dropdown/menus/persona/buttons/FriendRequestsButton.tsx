import { FiUsers } from "react-icons/fi"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const FriendRequestsButton: React.FC<Props> = ({}) => {
  const { goToMenu } = DropdownState.useContainer()
  return (
    <DropdownButton
      content={<FiUsers />}
      onClick={() => {
        goToMenu("requests")
      }}
      title="Friend Requests"
    />
  )
}
