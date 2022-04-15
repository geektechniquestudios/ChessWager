import { FiUsers } from "react-icons/fi"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const FriendRequestsButton: React.FC<Props> = ({}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  return (
    <DropdownButton
      content={<FiUsers />}
      onClick={() => {
        setActiveMenu("requests")
      }}
      title="Friend Requests"
    />
  )
}
