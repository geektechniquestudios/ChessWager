import "../../../../../style/buttons.scss"
import { Auth } from "../../../../containers/Auth"
import { BsBoxArrowInLeft } from "react-icons/bs"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  runTransaction,
  updateDoc,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../../firestore.config"
import { User } from "../../../../../interfaces/User"
import Swal from "sweetalert2"

const db = getFirestore(firebaseApp)

interface Props {
  id: string
  user1Id: string
  isSelected: boolean
  status: string
}

export const JoinButton: React.FC<Props> = ({
  id,
  user1Id,
  isSelected,
  status,
}) => {
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
        if (!(auth.currentUser ?? false)) return
        const userRef = collection(db, "users")
        const userDoc = doc(userRef, auth.currentUser!.uid)
        updateDoc(userDoc, { hasFirstBetBeenPlaced: true })
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Reconnecting wallet!",
          text: `Something went wrong. Try reconnecting your wallet`,
        })
      })
  }

  const { isDarkOn } = DarkMode.useContainer()
  return (
    <>
      {isSelected && status === "ready" && !isUser1 && (
        <div className="my-1 flex h-full animate-pulse flex-col justify-center lg:m-0">
          <div className="flex">
            <button
              onClick={(event) => {
                accept(event)
              }}
              type="button"
              title="Join Bet"
              className="color-shift ml-2 grid h-8 w-8 place-content-center rounded-md hover:bg-stone-300 dark:hover:bg-stone-900"
            >
              <BsBoxArrowInLeft
                color={isDarkOn ? "#bbf7d0" : "#14532d"}
                size="23"
              />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
