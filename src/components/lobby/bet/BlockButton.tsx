import { Auth } from "../../containers/Auth"
import { MdThumbDown } from "react-icons/md"
import { firebaseApp } from "../../../config"
import {
  arrayUnion,
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { LobbyState } from "../../containers/LobbyState"
const db = getFirestore(firebaseApp)

interface Props {
  user1Id: string
  user2Id: string
  status: string
  betId: string
}

// @todo safe delete on next cruft cleanup

export const BlockButton: React.FC<Props> = ({
  user1Id,
  user2Id,
  status,
  betId,
}) => {
  const { auth, user } = Auth.useContainer()
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", betId)

  const { refreshLobby } = LobbyState.useContainer()

  const kick = () => {
    updateDoc(betDoc, {
      status: "ready",
      user2Id: "",
      user2Metamask: "",
      user2PhotoURL: "",
      user2FollowThrough: [0, 0],
      user2DisplayName: "",
    })
      .then(refreshLobby)
      .catch(console.error)
  }

  const block = () => {
    const userDocRef = doc(db, "users", auth.currentUser!.uid)
    setDoc(
      userDocRef,
      {
        blocked: arrayUnion(user2Id),
      },
      { merge: true },
    ).catch(console.error)
    kick()
  }

  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && (
          <div className="flex flex-col justify-center">
            <button
              className="rounded-full h-8 w-8 opacity-100 z-0 grid place-content-center border-2 mx-2 transform hover:scale-110 ease duration-100"
              onClick={block}
            >
              <MdThumbDown color="red" />
            </button>
          </div>
        )}
    </>
  )
}
