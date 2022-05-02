import "../../../../../style/buttons.scss"
import { Auth } from "../../../../containers/Auth"
import { BsBoxArrowInLeft } from "react-icons/bs"
import { DarkMode } from "../../../../containers/DarkMode"
import { LobbyState } from "../../../../containers/LobbyState"
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"

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
  const { auth, walletAddress } = Auth.useContainer()
  const isUser1 = auth.currentUser?.uid === user1Id
  const userDoc: DocumentReference<DocumentData> = doc(
    db,
    "users",
    auth.currentUser!.uid,
  )
  const betDoc: DocumentReference<DocumentData> = doc(db, "lobby", id)

  const user2DisplayName = auth.currentUser?.displayName
  const { refreshLobby } = LobbyState.useContainer()

  const accept = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    getDoc(userDoc)
      .then((doc: any) => {
        const user2FollowThrough = [
          doc.data().betFundedCount,
          doc.data().betAcceptedCount,
        ]
        return user2FollowThrough
      })
      .then((user2FollowThrough: number[]) => {
        updateDoc(betDoc, {
          status: "pending",
          user2Id: auth.currentUser?.uid,
          user2Metamask: walletAddress,
          user2PhotoURL: auth.currentUser?.photoURL,
          user2FollowThrough: user2FollowThrough,
          user2DisplayName: user2DisplayName,
        })
          .then(refreshLobby)
          .catch(console.error)
      })
  }

  const { isDarkOn } = DarkMode.useContainer()
  return (
    <>
      {isSelected && status === "ready" && !isUser1 && (
        <div className="flex justify-center h-full flex-col animate-pulse">
          <div className="flex">
            <button
              onClick={(event) => {
                accept(event)
              }}
              type="button"
              title="Join Bet"
              className="color-shift w-8 h-8 grid place-content-center hover:bg-stone-300 dark:hover:bg-stone-900 rounded-md ml-2"
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
