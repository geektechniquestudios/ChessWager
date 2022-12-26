import {
  arrayUnion,
  CollectionReference,
  doc,
  DocumentData,
  getFirestore,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore"
import { MdBlockFlipped } from "react-icons/md"
import { firebaseApp } from "../../../../../../../firestore.config"
import { Auth } from "../../../../../containers/Auth"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"
import Swal from "sweetalert2"

const db = getFirestore(firebaseApp)

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
  const { setIsDropdownOpen, setMenuHeight } = DropdownState.useContainer()
  const { auth } = Auth.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)

  const blockUser = () => {
    const batch = writeBatch(db)

    batch.set(doc(blockedUsers, id), {
      userName: displayName,
      photoURL,
      createdAt: serverTimestamp(),
    })
    batch.update(userRef, {
      blockedUsers: arrayUnion(id),
    })
    batch.commit().then(() => {
      Swal.fire({
        icon: "error",
        title: "Blocked!",
        text: `${displayName} has been blocked.`,
      })
      setIsDropdownOpen(false)
      setMenuHeight(0)
    })
  }

  return (
    <DropdownButton
      content={<MdBlockFlipped />}
      onClick={() => {
        blockUser()
      }}
      title="Block User"
    />
  )
}
