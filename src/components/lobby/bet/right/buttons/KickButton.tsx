import { CircularProgress } from "@mui/material"
import {
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { useState } from "react"
import { FiUserMinus } from "react-icons/fi"
import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"

interface Props {
  id: string
  bet: Bet
}

export const KickButton: React.FC<Props> = ({ id, bet }) => {
  const { db } = Auth.useContainer()
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", id)
  const { refreshLobby } = LobbyState.useContainer()
  const [isKicking, setIsKicking] = useState<boolean>(false)

  const kick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setIsKicking(true)
    updateDoc(betDoc, {
      status: "ready",
      user2Id: "",
      user2Metamask: "",
      user2PhotoURL: "",
      user2FollowThrough: [],
      user2DisplayName: "",
      timestamp: serverTimestamp(),
    })
      .then(refreshLobby)
      .catch(console.error)
      .finally(() => {
        setIsKicking(false)
      })
  }
  const { isDarkOn } = DarkMode.useContainer()

  return (
    <motion.button
      initial={{ x: 70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 70, opacity: 0 }}
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
      <div className="grid w-5 place-content-center">
        {isKicking ? (
          <CircularProgress size={10} />
        ) : (
          <FiUserMinus color={isDarkOn ? "#fecaca" : "#7f1d1d"} size="12" />
        )}
      </div>
    </motion.button>
  )
}
