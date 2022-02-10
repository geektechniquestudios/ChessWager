import { RiCloseFill } from "react-icons/ri"
import firebase from "firebase/compat"
import { Auth } from "../../containers/Auth"
const firestore = firebase.firestore()

interface Props {
  user2Id: string
  status: string
  id: string
}

export const LeaveButton: React.FC<Props> = ({ user2Id, status, id }) => {
  const { user, auth } = Auth.useContainer()
  const betDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby").doc(id)

  const cancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    betDoc.update({
      status: "ready",
      user2Id: "",
      user2Metamask: "",
      user2PhotoURL: "",
    })
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
              className="bg-transparent text-negative transform hover:scale-125 ease duration-100 border-black place-content-center grid mx-1 p-0.5"
              id="leave-button"
            >
              <RiCloseFill />
            </button>
          </div>
        )}
    </>
  )
}
