import { RiCloseFill } from "react-icons/ri"
import firebase from "firebase/compat"
import { Auth } from "../../containers/Auth"

interface Props {
  user2Id: string
  status: string
  id: string
}

export const LeaveButton: React.FC<Props> = ({ user2Id, status, id }) => {
  const { user, auth } = Auth.useContainer()
  const cancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    const cancelBet = firebase.functions().httpsCallable("cancelBet")
    cancelBet({
      betId: id,
    }).catch(console.error)
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
              className="rounded-full bg-negative text-white transform hover:scale-110 ease duration-100 border border-black place-content-center grid p-0.5"
              id="leave-button"
            >
              <RiCloseFill size="0.8em" />
            </button>
          </div>
        )}
    </>
  )
}
