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
    betDoc.delete()
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
              className="bg-transparent text-negative transform hover:scale-125 ease duration-100  place-content-center grid mx-1 p-0.5"
              id="delete-button"
            >
              <RiCloseFill />
            </button>
          </div>
        )}
    </>
  )
}