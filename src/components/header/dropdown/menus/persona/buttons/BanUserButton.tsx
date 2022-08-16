import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { firebaseApp } from "../../../../../../config"
import { DropdownState } from "../../../../../containers/DropdownState"
import { UserDataState } from "../../../../../containers/UserDataState"
import { DropdownButton } from "./DropdownButton"

const db = getFirestore(firebaseApp)

interface Props {
  id?: string
  displayName?: string
  isBanned?: boolean
  moderatorLevel?: 0 | 1 | 2
}

export const BanUserButton: React.FC<Props> = ({
  id,
  displayName,
  isBanned,
  moderatorLevel,
}) => {
  const { setIsDropdownOpen, setMenuHeight } = DropdownState.useContainer()
  const { userData } = UserDataState.useContainer()

  const banUser = async () => {
    const userDoc = doc(db, "users", id!)
    updateDoc(userDoc, {
      isBanned: true,
    }).then(() => {
      alert(`${displayName} has been banned.`)
      setIsDropdownOpen(false)
      setMenuHeight(0)
    })
  }

  return (
    <>
      {id &&
        displayName &&
        (userData?.moderatorLevel ?? 0) > 0 &&
        id !== (userData?.id ?? "") &&
        (!isBanned ?? true) && (
          <DropdownButton
            content={<div className="px-0.5 text-xs">Ban User</div>}
            onClick={banUser}
            title="Ban User"
            className="font-bold text-red-700 hover:border-red-600 hover:text-red-500 dark:text-red-300 dark:hover:border-red-400 dark:hover:text-red-400"
          />
        )}
    </>
  )
}
