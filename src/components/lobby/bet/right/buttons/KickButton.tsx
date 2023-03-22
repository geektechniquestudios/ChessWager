import {
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  updateDoc,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { FiUserMinus } from "react-icons/fi"
import { firebaseApp } from "../../../../../../firestore.config"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"
const db = getFirestore(firebaseApp)

interface Props {
  id: string
}

export const KickButton: React.FC<Props> = ({ id }) => {
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", id)
  const { refreshLobby } = LobbyState.useContainer()
  const kick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    updateDoc(betDoc, {
      status: "ready",
      user2Id: "",
      user2Metamask: "",
      user2PhotoURL: "",
      user2FollowThrough: [],
      user2DisplayName: "",
    })
      .then(refreshLobby)
      .catch(console.error)
  }
  const { isDarkOn } = DarkMode.useContainer()
  return (
    <motion.button
      initial={{ x: 70 }}
      animate={{ x: 0 }}
      exit={{ x: 70 }}
      transition={{
        type: "spring",
        duration: 0.1,
        bounce: 0.5,
        mass: 0.2,
        delay: 0.05,
      }}
      className="bet-button color-shift flex animate-pulse items-center justify-center gap-1 rounded-md border px-1.5 font-bold"
      onClick={kick}
      title="Kick User"
    >
      <div className="text-xs font-bold">Kick</div>
      <FiUserMinus color={isDarkOn ? "#fecaca" : "#7f1d1d"} size="12" />
    </motion.button>
  )
}
