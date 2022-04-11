import { collection, doc, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { FollowButton } from "./buttons/FollowButton"
import { BlockUserButton } from "./buttons/BlockUserButton"
import { ReportUserButton } from "./buttons/ReportUserButton"
import { SendMessageButton } from "./buttons/SendMessageButton"
import { FollowersButton } from "./buttons/FollowersButton"
import { FollowingButton } from "./buttons/FollowingButton"
import { BlockedButton } from "./buttons/BlockedButton"

const db = getFirestore(firebaseApp)

interface Props {
  id: string
  displayName: string
  photoURL: string
  activeMenu: string
}

export const UserButtonsArea: React.FC<Props> = ({
  id,
  displayName,
  photoURL,
  activeMenu,
}) => {
  const { auth } = Auth.useContainer()
  const isUser = auth.currentUser?.uid === id
  const userDoc = doc(db, "users", auth.currentUser!.uid)
  const blockedUsers = collection(userDoc, "blocked")
  const isUserBlocked = ""
  const isFollowing = ""
  return (
    <>
      {!isUser && displayName !== "" && (
        <div className="h-22 my-1 flex w-full justify-evenly">
          <SendMessageButton
            id={id ?? ""}
            displayName={displayName}
            photoURL={photoURL}
            activeMenu={activeMenu}
          />
          <FollowButton id={id ?? ""} />
          <BlockUserButton
            id={id ?? ""}
            displayName={displayName}
            photoURL={photoURL}
            blockedUsers={blockedUsers}
          />
          <ReportUserButton id={id ?? ""} activeMenu={activeMenu} />
        </div>
      )}
      {isUser && (
        <div className="h-22 my-1 flex w-full justify-evenly">
          <FollowersButton />
          <FollowingButton />
          <BlockedButton />
        </div>
      )}
    </>
  )
}
