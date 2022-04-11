import { doc, setDoc } from "firebase/firestore"
import { MdBlockFlipped } from "react-icons/md"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
  displayName: string
  photoURL: string
  blockedUsers: any
}

export const BlockUserButton: React.FC<Props> = ({
  id,
  displayName,
  photoURL,
  blockedUsers,
}) => {
  const blockUser = () => {
    setDoc(doc(blockedUsers, id), {
      userName: displayName,
      photoURL,
    })
  }

  return (
    <DropdownButton
      content={<MdBlockFlipped />}
      onClick={blockUser}
      title="Block User"
    />
  )
}
