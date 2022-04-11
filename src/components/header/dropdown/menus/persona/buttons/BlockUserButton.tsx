import {
  CollectionReference,
  doc,
  DocumentData,
  setDoc,
  Timestamp,
} from "firebase/firestore"
import { MdBlockFlipped } from "react-icons/md"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
  displayName: string
  photoURL: string
  blockedUsers: CollectionReference<DocumentData>
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
      createdAt: Timestamp.now(),
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
