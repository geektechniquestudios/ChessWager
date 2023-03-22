import { Auth } from "../../../../containers/Auth"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"
import {
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  runTransaction,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../../firestore.config"
import { User } from "../../../../../interfaces/User"
import { CustomSwal } from "../../../../popups/CustomSwal"
import { Bet } from "../../../../../interfaces/Bet"
import { GiJoint } from "react-icons/gi"
import { AnimatePresence, motion } from "framer-motion"

const db = getFirestore(firebaseApp)

interface Props {
  bet: Bet
  isSelected: boolean
}

export const JoinButton: React.FC<Props> = ({ bet, isSelected }) => {
  const { id, user1Id, status } = bet
  const { auth, walletAddress, connectWallet } = Auth.useContainer()
  const { refreshLobby } = LobbyState.useContainer()

  const isUser1 = auth.currentUser?.uid === user1Id
  const userDoc = doc(
    db,
    "users",
    auth.currentUser!.uid,
  ) as DocumentReference<User>
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", id)

  const user2DisplayName = auth.currentUser?.displayName
  const { isWalletConnected } = Auth.useContainer()

  const accept = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    if (!isWalletConnected) await connectWallet()
    runTransaction(db, async (transaction) => {
      const doc = await transaction.get(userDoc)
      const user2FollowThrough = [
        doc.data()?.betFundedCount ?? 0,
        doc.data()?.betAcceptedCount ?? 0,
      ]
      transaction.update(betDoc, {
        status: "pending",
        user2Id: auth.currentUser?.uid,
        user2Metamask: walletAddress,
        user2PhotoURL: auth.currentUser?.photoURL,
        user2FollowThrough: user2FollowThrough,
        user2DisplayName: user2DisplayName,
      })
    })
      .then(() => {
        refreshLobby()
      })
      .catch(() => {
        CustomSwal(
          "error",
          "Couldn't join",
          "Something went wrong. Try reconnecting your wallet",
        )
      })
  }

  const { isDarkOn } = DarkMode.useContainer()

  return (
    <AnimatePresence>
      {isSelected && status === "ready" && !isUser1 && (
        <motion.button
          initial={{ x: 20 }}
          animate={{ x: -1 }}
          exit={{ x: 70 }}
          transition={{ duration: 0.1 }}
          onClick={accept}
          type="button"
          title="Join Bet"
          className="bet-button color-shift absolute bottom-1 right-1 flex h-6 shrink-0 animate-pulse items-center justify-center gap-1 rounded-md border px-1.5 font-bold"
        >
          <div className="text-xs">Join</div>
          <GiJoint size="12" color={isDarkOn ? "#bbf7d0" : "#14532d"} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
