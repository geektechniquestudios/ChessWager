import firebase from "firebase/compat"
import { FiUserCheck } from "react-icons/fi"
import "../../../style/buttons.scss"
const firestore = firebase.firestore()
interface Props {
  betId: string
}

export const ApproveButton: React.FC<Props> = ({ betId }) => {
  const betDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby").doc(betId)

  const approve = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    betDoc
      .update({
        status: "approved",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch(console.error)
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          type="button"
          className="color-shift w-8 h-8 grid place-content-center hover:bg-stone-300 dark:hover:bg-stone-800 rounded-md animate-pulse"
          onClick={approve}
          title="Accept"
        >
          <FiUserCheck color="green" size="19" />
        </button>
      </div>
    </>
  )
}
