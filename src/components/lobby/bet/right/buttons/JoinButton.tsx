import {
  doc,
  DocumentData,
  DocumentReference,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import { GiJoint } from "react-icons/gi"
import { Bet } from "../../../../../interfaces/Bet"
import { User } from "../../../../../interfaces/User"
import { Auth } from "../../../../containers/Auth"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"
import { CustomSwal } from "../../../../popups/CustomSwal"

interface Props {
  bet: Bet
  isSelected: boolean
}

export const JoinButton: React.FC<Props> = ({ bet, isSelected }) => {
  const { id, user1Id, status, amount, multiplier } = bet
  const { auth, walletAddress, connectWallet, doesUserHaveEnoughAvax, db } =
    Auth.useContainer()
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
    if (!(await doesUserHaveEnoughAvax(amount * multiplier))) {
      CustomSwal(
        "error",
        "Insufficient Funds",
        "Deposit more Avax to join this bet.",
      )
      return
    }
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
        timestamp: serverTimestamp(),
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
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: -1, opacity: 1 }}
          exit={{ x: 70, opacity: 1 }}
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
