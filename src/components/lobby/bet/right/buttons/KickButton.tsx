import {
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  updateDoc,
} from "firebase/firestore"
import { FiUserMinus } from "react-icons/fi"
import { firebaseApp } from "../../../../../../firestore.config"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"
const db = getFirestore(firebaseApp)

interface Props {
  betId: string
}

export const KickButton: React.FC<Props> = ({ betId }) => {
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", betId)
  const { refreshLobby } = LobbyState.useContainer()
  const kick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    updateDoc(betDoc, {
      status: "ready",
      user2Id: "",
      user2Metamask: "",
      user2PhotoURL: "",
      user2FollowThrough: [0, 0],
      user2DisplayName: "",
    })
      .then(refreshLobby)
      .catch(console.error)
  }
  const { isDarkOn } = DarkMode.useContainer()
  return (
    <button
      className="color-shift grid h-8 w-8 animate-pulse place-content-center rounded-md hover:bg-stone-300 dark:hover:bg-stone-800"
      onClick={kick}
      title="Kick User"
    >
      <FiUserMinus color={isDarkOn ? "#fecaca" : "#7f1d1d"} size="19" />
    </button>
  )
}
