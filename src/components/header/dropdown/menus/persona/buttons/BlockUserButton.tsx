import {
  arrayUnion,
  CollectionReference,
  doc,
  DocumentData,
  getFirestore,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore"
import { MdBlockFlipped } from "react-icons/md"
import { firebaseApp } from "../../../../../../config"
import { Auth } from "../../../../../containers/Auth"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

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
    setDoc(doc(blockedUsers, id), {
      userName: displayName,
      photoURL,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        setDoc(
          userRef,
          {
            blockedUsers: arrayUnion(id),
          },
          { merge: true },
        )
      })
      .then(() => {
        alert(`${displayName} has been blocked.`)
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
