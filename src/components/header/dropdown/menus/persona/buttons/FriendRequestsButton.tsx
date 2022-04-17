import { FiUsers } from "react-icons/fi"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const FriendRequestsButton: React.FC<Props> = ({}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  const { menuStack, setMenuStack } = DropdownState.useContainer()
  return (
    <DropdownButton
      content={<FiUsers />}
      onClick={() => {
        setActiveMenu("requests")
        setMenuStack([...menuStack, "requests"])
      }}
      title="Friend Requests"
    />
  )
}
