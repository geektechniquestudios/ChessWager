import { Auth } from "../../containers/Auth"
import firebase from "firebase/compat"
import { FiUserMinus } from "react-icons/fi"

interface Props {
  betId: string
}

export const KickButton: React.FC<Props> = ({ betId }) => {
  const kick = () => {
    const kickUser = firebase.functions().httpsCallable("kickUser")
    kickUser({
      betId: betId,
    }).catch(console.error)
  }
  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          className="rounded-full h-8 w-8 opacity-100 z-0 grid place-content-center border-1 mx-2 transform hover:scale-110 ease duration-100"
          onClick={kick}
          title="Kick User"
        >
          <FiUserMinus color="red" size="19" />
        </button>
      </div>
    </>
  )
}
