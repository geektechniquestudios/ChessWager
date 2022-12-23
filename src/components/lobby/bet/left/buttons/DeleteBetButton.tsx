import "../../../../../style/lobby.scss"
import { Auth } from "../../../../containers/Auth"
import { RiCloseFill } from "react-icons/ri"
import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../../firestore.config"

const db = getFirestore(firebaseApp)

interface Props {
  user1Id: string
  status: string
  id: string
}

export const DeleteBetButton: React.FC<Props> = ({ user1Id, status, id }) => {
  const { user, auth } = Auth.useContainer()
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", id)
  const deleteCurrentBet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    deleteDoc(betDoc).catch(console.error)
  }

  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status !== "approved" && (
          <div className="flex flex-col justify-center align-middle">
            <button
              type="button"
              title="Delete Bet"
              onClick={deleteCurrentBet}
              className="color-shift clickable mx-1 grid transform place-content-center border-0 p-0.5 text-red-600 hover:text-red-600 dark:text-red-600 dark:hover:text-rose-300"
              id="delete-button"
            >
              <RiCloseFill />
            </button>
          </div>
        )}
    </>
  )
}
