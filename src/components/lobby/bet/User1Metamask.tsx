import { Auth } from "../../containers/Auth"
import { MetamaskPrompt } from "../MetamaskPrompt"

interface Props {
  betId: string
  amount: number
  betSide: string
  multiplier: number
  user1Id: string
  user1Metamask: string
  user2Id: string
  user2Metamask: string
  gameId: string
  timestamp: number
  contractAddress: string
  status: string
  hasUser1Paid: boolean
}

export const User1Metamask: React.FC<Props> = ({
  betId,
  amount,
  betSide,
  multiplier,
  user1Id,
  user1Metamask,
  user2Id,
  user2Metamask,
  gameId,
  timestamp,
  contractAddress,
  status,
  hasUser1Paid,
}) => {
  const { auth } = Auth.useContainer()
  const isUser1 = auth.currentUser?.uid === user1Id

  return (
    <>
      {status === "approved" &&
        isUser1 &&
        !hasUser1Paid &&
        timestamp !== undefined &&
        timestamp !== null &&
        timestamp !== 0 && (
          <MetamaskPrompt
            betId={betId}
            amount={amount}
            betSide={betSide}
            multiplier={multiplier}
            user1Id={user1Id}
            user1Metamask={user1Metamask}
            user2Id={user2Id}
            user2Metamask={user2Metamask}
            gameId={gameId}
            timestamp={timestamp}
            contractAddress={contractAddress}
          />
        )}
    </>
  )
}
