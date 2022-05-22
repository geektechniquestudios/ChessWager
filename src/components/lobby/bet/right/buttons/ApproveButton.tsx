import "../../../../../style/buttons.scss"
import {
  DocumentData,
  DocumentReference,
  updateDoc,
  serverTimestamp,
  doc,
  getFirestore,
} from "firebase/firestore"
import { FiUserCheck } from "react-icons/fi"
import { firebaseApp } from "../../../../../config"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"
interface Props {
  betId: string
  user1Id: string
  user2Id: string
}
const db = getFirestore(firebaseApp)

export const ApproveButton: React.FC<Props> = ({ betId, user1Id, user2Id }) => {
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", betId)
  const { refreshLobby } = LobbyState.useContainer()
  const approve = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    updateDoc(betDoc, {
      users: [user1Id, user2Id],
      status: "approved",
      timestamp: serverTimestamp(),
    })
      .then(refreshLobby)
      .catch(console.error)
  }

  const { isDarkOn } = DarkMode.useContainer()

  return (
    <button
      type="button"
      className="color-shift grid h-8 w-8 animate-pulse place-content-center rounded-md hover:bg-stone-300 dark:hover:bg-stone-800"
      onClick={approve}
      title="Accept"
    >
      <FiUserCheck color={isDarkOn ? "#bbf7d0" : "#14532d"} size="19" />
    </button>
  )
}
