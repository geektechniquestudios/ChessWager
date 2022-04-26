import {
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  updateDoc,
} from "firebase/firestore"
import { FiUserMinus } from "react-icons/fi"
import { firebaseApp } from "../../../../../config"
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
    <>
      <div className="flex flex-col justify-center">
        <button
          className="color-shift w-8 h-8 grid place-content-center hover:bg-stone-300 dark:hover:bg-stone-800 rounded-md animate-pulse"
          onClick={kick}
          title="Kick User"
        >
          <FiUserMinus color={isDarkOn ? "#fecaca" : "#7f1d1d"} size="19" />
        </button>
      </div>
    </>
  )
}
