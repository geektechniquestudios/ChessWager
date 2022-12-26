import "../../../../../style/buttons.scss"
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
const db = getFirestore(firebaseApp)

interface Props {
  user2Id: string
  status: string
  id: string
}

export const LeaveButton: React.FC<Props> = ({ user2Id, status, id }) => {
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
              className="color-shift clickable mx-1 grid transform place-content-center border-0 p-0.5 text-red-600 hover:text-red-600 dark:text-red-600 dark:hover:text-rose-300"
              id="leave-button"
            >
              <RiCloseFill />
            </button>
          </div>
        )}
    </>
  )
}
