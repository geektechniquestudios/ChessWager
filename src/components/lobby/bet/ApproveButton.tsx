import { Auth } from "../../containers/Auth"
import firebase from "firebase/compat"
import { MdThumbUp } from "react-icons/md"

interface Props {
  user1Id: string
  status: string
  betId: string
}

export const ApproveButton: React.FC<Props> = ({ user1Id, status, betId }) => {
  const { auth, user } = Auth.useContainer()

  const approve = () => {
    const approveBet = firebase.functions().httpsCallable("approveBet")
    approveBet({
      betId: betId,
    }).catch(console.error)
  }

  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && (
          <div className="flex flex-col justify-center">
            <button
              className="animate-pulse rounded-full h-8 w-8 opacity-100 z-10  grid place-content-center border-2 mx-2 transform hover:scale-110 ease duration-100"
              onClick={approve}
            >
              <MdThumbUp color="green" />
            </button>
          </div>
        )}
    </>
  )
}
