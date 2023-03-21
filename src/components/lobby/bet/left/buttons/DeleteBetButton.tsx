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
import { Bet } from "../../../../../interfaces/Bet"

const db = getFirestore(firebaseApp)

interface Props {
  bet: Bet
  isSelected: boolean
}

export const DeleteBetButton: React.FC<Props> = ({ bet, isSelected }) => {
  const { user, auth } = Auth.useContainer()
  const { id, user1Id, status } = bet
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
        user1Id === auth.currentUser?.uid &&
        status !== "approved" &&
        isSelected && (
          <button
            type="button"
            title="Delete"
            onClick={deleteCurrentBet}
            className="color-shift clickable absolute top-0.5 left-0.5 z-40 grid place-content-center rounded-full border border-stone-600 bg-white p-0.5 text-stone-800 hover:border-black hover:text-black dark:border-stone-400 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-white dark:hover:text-white"
            id="delete-button"
          >
            <RiCloseFill size={12} />
          </button>
        )}
    </>
  )
}
