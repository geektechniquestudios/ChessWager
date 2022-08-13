import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { firebaseApp } from "../../../../../../config"
import { UserDataState } from "../../../../../containers/UserDataState"
import { DropdownButton } from "./DropdownButton"

const db = getFirestore(firebaseApp)

interface Props {
  id: string
  displayName: string
}

export const BanUserButton: React.FC<Props> = ({ id, displayName }) => {
  const userDoc = doc(db, "users", id)
  const banUser = async () => {
    updateDoc(userDoc, {
      isBanned: true,
    }).then(() => {
      alert(`${displayName} has been banned.`)
    })
  }
  return (
    <DropdownButton
      content={<div className="px-0.5 text-xs">Ban User</div>}
      onClick={() => {
        banUser()
      }}
      title="Ban User"
      className="font-bold text-red-700 hover:border-red-600 hover:text-red-500 dark:text-red-300 dark:hover:border-red-400 dark:hover:text-red-400"
    />
  )
}
