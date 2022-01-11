import { Auth } from "../../containers/Auth"
import firebase from "firebase/compat"
import { RiCloseFill } from "react-icons/ri"

interface Props {
  user1Id: string
  status: string
  id: string
}

export const DeleteBetButton: React.FC<Props> = ({ user1Id, status, id }) => {
  const { user, auth } = Auth.useContainer()
  const deleteCurrentBet = () => {
    const deleteBet = firebase.functions().httpsCallable("deleteBet")
    deleteBet({
      betId: id,
    }).catch(console.error)
  }

  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status !== "approved" && (
          <div className="flex">
            <button
              title="Delete"
              onClick={deleteCurrentBet}
              className="rounded-sm bg-negative h-3.5 w-3.5 text-white transform hover:scale-110 ease duration-100 border border-black place-content-center grid mx-1"
            >
              <RiCloseFill size="0.5em" />
            </button>
          </div>
        )}{" "}
    </>
  )
}
