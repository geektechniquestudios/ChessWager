import firebase from "firebase/compat"
import { FiUserCheck } from "react-icons/fi"
const firestore = firebase.firestore()
interface Props {
  user1Id: string
  status: string
  betId: string
}

export const ApproveButton: React.FC<Props> = ({ user1Id, status, betId }) => {
  const betDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby").doc(betId)

  const approve = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    betDoc.update({
      status: "approved",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          type="button"
          className="animate-pulse rounded-full h-8 w-8 opacity-100 z-10 grid place-content-center border-1 mx-2 transform hover:scale-110 ease duration-100"
          onClick={approve}
          title="Accept"
        >
          <FiUserCheck color="green" size="19" />
        </button>
      </div>
    </>
  )
}
