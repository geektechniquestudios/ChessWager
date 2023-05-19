import { CircularProgress } from "@mui/material"
import {
  DocumentData,
  DocumentReference,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { useState } from "react"
import { FiUserCheck } from "react-icons/fi"
import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"

interface Props {
  bet: Bet
}

export const ApproveButton: React.FC<Props> = ({ bet }) => {
  const { id, user1Id, user2Id } = bet
  const { db } = Auth.useContainer()
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", id)
  const { refreshLobby } = LobbyState.useContainer()
  const approve = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setIsApprovinng(true)
    updateDoc(betDoc, {
      users: [user1Id, user2Id],
      status: "approved",
      timestamp: serverTimestamp(),
    })
      .then(refreshLobby)
      .catch(console.error)
      .finally(() => {
        setIsApprovinng(false)
      })
  }

  const { isDarkOn } = DarkMode.useContainer()

  const [isApproving, setIsApprovinng] = useState<boolean>(false)

  return (
    <motion.button
      initial={{ x: 90, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 90, opacity: 1 }}
      transition={{ type: "spring", duration: 0.1, bounce: 0.5, mass: 0.2 }}
      type="button"
      className="bet-button color-shift flex animate-pulse items-center justify-center gap-1 rounded-md border px-1.5 font-bold"
      onClick={approve}
      title="Approve"
    >
      <div className="text-xs font-bold">Approve</div>
      <div className="grid w-5 place-content-center">
        {isApproving ? (
          <CircularProgress size={10} />
        ) : (
          <FiUserCheck color={isDarkOn ? "#bbf7d0" : "#14532d"} size="12" />
        )}
      </div>
    </motion.button>
  )
}
