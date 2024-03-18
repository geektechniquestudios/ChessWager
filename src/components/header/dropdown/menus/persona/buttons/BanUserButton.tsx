import { DocumentReference, doc, updateDoc } from "firebase/firestore"
import { AuthState } from "../../../../../../containers/AuthState"
import { DropdownState } from "../../../../../../containers/DropdownState"
import { UserDataState } from "../../../../../../containers/UserDataState"
import { CustomSwal } from "../../../../../popups/CustomSwal"
import { DropdownButton } from "./DropdownButton"
import { User } from "../../../../../../interfaces/User"

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
  const { db } = AuthState.useContainer()
  const { setIsDropdownOpen, setMenuHeight } = DropdownState.useContainer()
  const { userData } = UserDataState.useContainer()

  const banUser = async () => {
    const userDoc = doc(db, "users", id!) as DocumentReference<User>
    updateDoc(userDoc, {
      isBanned: true,
    }).then(() => {
      CustomSwal("warning", "Banned", `${displayName} has been banned.`)
      setIsDropdownOpen(false)
      setMenuHeight(0)
    })
  }

  const shouldShowButton =
    id &&
    displayName &&
    (userData?.moderatorLevel ?? 0) > (moderatorLevel ?? 0) &&
    id !== (userData?.id ?? "") &&
    !isBanned

  return (
    <>
      {shouldShowButton && (
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
