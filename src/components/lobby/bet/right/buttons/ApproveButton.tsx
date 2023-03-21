import {
  DocumentData,
  DocumentReference,
  updateDoc,
  serverTimestamp,
  doc,
  getFirestore,
} from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import { FiUserCheck } from "react-icons/fi"
import { firebaseApp } from "../../../../../../firestore.config"
import { Bet } from "../../../../../interfaces/Bet"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"

interface Props {
  bet: Bet
}

const db = getFirestore(firebaseApp)

export const ApproveButton: React.FC<Props> = ({ bet }) => {
  const { id, user1Id, user2Id } = bet
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", id)
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
    <AnimatePresence>
      <motion.button
        layout
        initial={{ x: 40 }}
        animate={{ x: 0 }}
        exit={{ x: 40 }}
        transition={{ type: "spring", duration: 0.1, bounce: 0.5, mass: 0.2 }}
        type="button"
        className="color-shift flex animate-pulse items-center justify-center gap-1 rounded-md border bg-stone-800 px-1.5 text-stone-200 hover:bg-stone-300 dark:hover:border-white dark:hover:bg-stone-600 dark:hover:text-white"
        onClick={approve}
        title="Approve"
      >
        <div className="text-xs font-bold">Approve</div>
        <FiUserCheck color={isDarkOn ? "#bbf7d0" : "#14532d"} size="12" />
      </motion.button>
    </AnimatePresence>
  )
}
