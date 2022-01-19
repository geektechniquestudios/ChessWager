import "firebase/compat/functions"
import firebase from "firebase/compat"
import { Auth } from "../../containers/Auth"

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
        <button onClick={accept} type="button">
          Join
        </button>
      )}
    </>
  )
}
