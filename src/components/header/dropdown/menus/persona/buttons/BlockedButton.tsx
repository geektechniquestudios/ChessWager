import { MdBlockFlipped } from "react-icons/md"
import { DropdownState } from "../../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

interface Props {}

export const BlockedButton: React.FC<Props> = ({}) => {
  const { goToMenu } = DropdownState.useContainer()

  return (
    <DropdownButton
      content={<MdBlockFlipped />}
      onClick={() => {
        goToMenu("blocked")
      }}
      title="Blocked Users"
    />
  )
}
