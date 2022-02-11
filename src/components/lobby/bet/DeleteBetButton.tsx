import { Auth } from "../../containers/Auth"
import firebase from "firebase/compat"
import { RiCloseFill } from "react-icons/ri"
import "../../../style/lobby.scss"
const firestore = firebase.firestore()

interface Props {
  user1Id: string
  status: string
  id: string
}

export const DeleteBetButton: React.FC<Props> = ({ user1Id, status, id }) => {
  const { user, auth } = Auth.useContainer()
  const betDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby").doc(id)
  const deleteCurrentBet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    betDoc.delete().catch(console.error)
  }

  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status !== "approved" && (
          <div className="flex flex-col justify-center align-middle">
            <button
              type="button"
              title="Delete Bet"
              onClick={deleteCurrentBet}
              className="cw-button dark:text-negative text-negative hover:text-negative dark:hover:text-rose-300 transform grid place-content-center mx-1 p-0.5 border-0"
              id="delete-button"
            >
              <RiCloseFill />
            </button>
          </div>
        )}
    </>
  )
}
