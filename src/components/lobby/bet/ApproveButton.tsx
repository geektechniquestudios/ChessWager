import {
  DocumentData,
  DocumentReference,
  updateDoc,
  serverTimestamp,
  doc,
  getFirestore,
  getDoc,
} from "firebase/firestore"
import { FiUserCheck } from "react-icons/fi"
import { firebaseApp } from "../../../config"
import "../../../style/buttons.scss"
import { DarkMode } from "../../containers/DarkMode"
import { LobbyState } from "../../containers/LobbyState"
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
    <>
      <div className="flex flex-col justify-center">
        <button
          type="button"
          className="color-shift w-8 h-8 grid place-content-center hover:bg-stone-300 dark:hover:bg-stone-800 rounded-md animate-pulse"
          onClick={approve}
          title="Accept"
        >
          <FiUserCheck color={isDarkOn ? "#bbf7d0" : "#14532d"} size="19" />
        </button>
      </div>
    </>
  )
}
