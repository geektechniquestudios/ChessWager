import { Auth } from "../../containers/Auth"
import firebase from "firebase/compat"
import { MdThumbDown } from "react-icons/md"
import { FiUserMinus } from "react-icons/fi"

interface Props {
  user1Id: string
  status: string
  betId: string
}

export const KickButton: React.FC<Props> = ({ user1Id, status, betId }) => {
  const { auth, user } = Auth.useContainer()
  const kick = () => {
    const kickUser = firebase.functions().httpsCallable("kickUser")
    kickUser({
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
              className="rounded-full h-8 w-8 opacity-100 z-0 grid place-content-center border-2 mx-2 transform hover:scale-110 ease duration-100"
              onClick={kick}
            >
              <FiUserMinus color="red" size="19" />
            </button>
          </div>
        )}
    </>
  )
}
