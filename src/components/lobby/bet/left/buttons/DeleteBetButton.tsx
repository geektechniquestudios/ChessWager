import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore"
import { RiCloseFill } from "react-icons/ri"
import { Bet } from "../../../../../interfaces/Bet"
import "../../../../../style/lobby.scss"
import { Auth } from "../../../../containers/Auth"

interface Props {
  bet: Bet
  isSelected: boolean
}

export const DeleteBetButton: React.FC<Props> = ({ bet, isSelected }) => {
  const { user, auth, db } = Auth.useContainer()
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
            className="close-button color-shift clickable absolute left-0.5 top-0.5 z-40 grid place-content-center rounded-full border p-0.5"
            id="delete-button"
          >
            <RiCloseFill size={12} />
          </button>
        )}
    </>
  )
}
