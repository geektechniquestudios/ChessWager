import { MdBlockFlipped } from "react-icons/md"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const BlockedButton: React.FC<Props> = ({}) => {
  const { setActiveMenu, menuStack, setMenuStack } =
    DropdownState.useContainer()

  return (
    <DropdownButton
      content={<MdBlockFlipped />}
      onClick={() => {
        setActiveMenu("blocked")
        setMenuStack([...menuStack, "blocked"])
      }}
      title="Blocked Users"
    />
  )
}
