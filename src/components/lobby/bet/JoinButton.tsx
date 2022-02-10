import "firebase/compat/functions"
import firebase from "firebase/compat"
import { Auth } from "../../containers/Auth"
import { BsPlay } from "react-icons/bs"
const firestore = firebase.firestore()

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
  const userDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
    firestore.collection("users").doc(auth.currentUser?.uid)
  const betDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby").doc(id)

  const user2DisplayName = auth.currentUser?.displayName

  const accept = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    userDoc
      .get()
      .then((doc: any) => {
        const user2FollowThrough = [
          doc.data().betFundedCount,
          doc.data().betAcceptedCount,
        ]
        return user2FollowThrough
      })
      .then((user2FollowThrough: number[]) => {
        betDoc.update({
          status: "pending",  
          user2Id: auth.currentUser?.uid,
          user2Metamask: walletAddress,
          user2PhotoURL: auth.currentUser?.photoURL,
          user2FollowThrough: user2FollowThrough,
          user2DisplayName: user2DisplayName,
        })
      })
  }

  return (
    <>
      {isSelected && status === "ready" && !isUser1 && (
        <div className="flex justify-center align-middle h-full flex-col animate-pulse">
          <div className="border-1 rounded-full transform hover:scale-x-105 flex">
            <button
              onClick={accept}
              type="button"
              title="Join Bet"
              className="w-8 h-8 text-xs grid place-content-center"
            >
              <BsPlay color="green" size="26" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
