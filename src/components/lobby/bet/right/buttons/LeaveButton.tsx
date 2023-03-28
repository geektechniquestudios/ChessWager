import { RiCloseFill } from "react-icons/ri"
import { Auth } from "../../../../containers/Auth"
import { LobbyState } from "../../../../containers/LobbyState"
import {
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  updateDoc,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../../firestore.config"
import { Bet } from "../../../../../interfaces/Bet"
import { motion } from "framer-motion"

const db = getFirestore(firebaseApp)

interface Props {
  bet: Bet
}

export const LeaveButton: React.FC<Props> = ({ bet }) => {
  const { id, user2Id, status } = bet
  const { user, auth } = Auth.useContainer()
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", id)

  const { refreshLobby } = LobbyState.useContainer()
  const cancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  return (
    <>
      {user &&
        auth.currentUser &&
        user2Id === auth.currentUser.uid &&
        status === "pending" && (
          <button
            onClick={cancel}
            className="close-button color-shift clickable absolute top-0.5 right-0.5 grid place-content-center rounded-full border p-0.5"
            id="leave-button"
          >
            <RiCloseFill size={12} />
          </button>
        )}
    </>
  )
}
