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
          <div className="flex flex-col justify-center align-middle">
            <button
              title="Leave"
              onClick={cancel}
              className="color-shift clickable absolute top-0.5 right-0.5 grid place-content-center rounded-full border border-stone-600 bg-white p-0.5 text-stone-800 hover:border-black hover:text-black dark:border-stone-400 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-white dark:hover:text-white"
              id="leave-button"
            >
              <RiCloseFill size={12} />
            </button>
          </div>
        )}
    </>
  )
}
