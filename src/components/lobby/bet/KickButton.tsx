import firebase from "firebase/compat"
import { FiUserMinus } from "react-icons/fi"
const firestore = firebase.firestore()

interface Props {
  betId: string
}

export const KickButton: React.FC<Props> = ({ betId }) => {
  const betDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby").doc(betId)

  const kick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    betDoc.update({
      status: "ready",
      user2Id: "",
      user2Metamask: "",
      user2PhotoURL: "",
      user2FollowThrough: [0, 0],
      user2DisplayName: "",
    })
  }
  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          className="rounded-full h-8 w-8 opacity-100 z-0 grid place-content-center border-1 mx-2 transform hover:scale-110 ease duration-100"
          onClick={kick}
          title="Kick User"
        >
          <FiUserMinus color="red" size="19" />
        </button>
      </div>
    </>
  )
}
