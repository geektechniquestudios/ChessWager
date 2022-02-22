import firebase from "firebase/compat"
import { FiUserMinus } from "react-icons/fi"
import { DarkMode } from "../../containers/DarkMode"
const firestore = firebase.firestore()

interface Props {
  betId: string
}

export const KickButton: React.FC<Props> = ({ betId }) => {
  const betDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby").doc(betId)

  const kick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    betDoc
      .update({
        status: "ready",
        user2Id: "",
        user2Metamask: "",
        user2PhotoURL: "",
        user2FollowThrough: [0, 0],
        user2DisplayName: "",
      })
      .catch(console.error)
  }
  const { isDarkOn } = DarkMode.useContainer()
  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          className="color-shift w-8 h-8 grid place-content-center hover:bg-stone-300 dark:hover:bg-stone-800 rounded-md animate-pulse"
          onClick={kick}
          title="Kick User"
        >
          <FiUserMinus color={isDarkOn ? "#7f1d1d" : "#fecaca"} size="19" />
        </button>
      </div>
    </>
  )
}
