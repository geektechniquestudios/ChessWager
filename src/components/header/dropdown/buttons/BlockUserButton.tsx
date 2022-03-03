import { MdBlockFlipped } from "react-icons/md"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
}

export const BlockUserButton: React.FC<Props> = ({ id }) => {
  const blockUser = () => {}
  return (
    <DropdownButton
      content={<MdBlockFlipped />}
      onClick={blockUser}
      title="Block User"
    />
  )
}
