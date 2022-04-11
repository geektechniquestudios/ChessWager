import { MdBlockFlipped } from "react-icons/md"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const BlockedButton: React.FC<Props> = ({}) => {
  const { setActiveMenu } = DropdownState.useContainer()

  return (
    <DropdownButton
      content={<MdBlockFlipped />}
      onClick={() => {
        setActiveMenu("blocked")
      }}
      title="Manage Blocked Users"
    />
  )
}
