import { arrayUnion, collection, doc, writeBatch } from "firebase/firestore"
import { RiUserFollowLine } from "react-icons/ri"
import { AuthState } from "../../../../../../containers/AuthState"
import { DropdownButton } from "./DropdownButton"

interface Props {
  className?: string
  id: string
}

export const CancelPendingRequestButton: React.FC<Props> = ({
  className,
  id,
}) => {
  const { auth, db } = AuthState.useContainer()
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const targetUserRef = doc(db, "users", id)
  const requestsCollection = collection(targetUserRef, "requests")
  const cancelRequest = () => {
    const batch = writeBatch(db)
    batch.delete(doc(requestsCollection, auth.currentUser!.uid))
    batch.update(userRef, {
      redactedFriendRequests: arrayUnion(id),
    })
    batch.commit()
  }
  return (
    <DropdownButton
      className={className}
      content={<RiUserFollowLine />}
      onClick={() => {
        cancelRequest()
      }}
      title="Cancel Request"
    />
  )
}
