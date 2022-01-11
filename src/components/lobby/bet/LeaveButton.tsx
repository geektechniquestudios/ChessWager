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
  const cancel = () => {
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
          <div className="flex">
            <button
              title="Leave"
              onClick={cancel}
              className="rounded-sm bg-negative h-3.5 w-3.5 text-white transform hover:scale-110 ease duration-100 border border-black place-content-center grid mx-1"
            >
              <RiCloseFill size="0.5em" />
            </button>
          </div>
        )}
    </>
  )
}
