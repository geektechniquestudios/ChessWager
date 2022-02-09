import "firebase/compat/functions"
import firebase from "firebase/compat"
import { Auth } from "../../containers/Auth"
import { BsPlay } from "react-icons/bs"

interface Props {
  id: string
  user1Id: string
  isSelected: boolean
  status: string
}

export const JoinButton: React.FC<Props> = ({
  id,
  user1Id,
  isSelected,
  status,
}) => {
  const { auth, walletAddress } = Auth.useContainer()
  const isUser1 = auth.currentUser?.uid === user1Id

  const user2DisplayName = auth.currentUser?.displayName
  const accept = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    const acceptBet = firebase.functions().httpsCallable("acceptBet")
    acceptBet({
      betId: id,
      photoURL: auth.currentUser?.photoURL,
      hostUid: user1Id,
      user2Metamask: walletAddress,
      user2DisplayName: user2DisplayName,
    }).catch(console.error)
  }

  return (
    <>
      {isSelected && status === "ready" && !isUser1 && (
        <div className="flex justify-center align-middle h-full flex-col animate-pulse">
          <div className="border-1 rounded-full transform hover:scale-x-105 flex">
            <button onClick={accept} type="button" title="Join Bet" className="w-8 h-8 text-xs grid place-content-center" >
              <BsPlay color="green" size="26"/>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
