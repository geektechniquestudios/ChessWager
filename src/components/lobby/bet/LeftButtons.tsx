import { DeleteBetButton } from "./DeleteBetButton"
import { User1Metamask } from "./User1Metamask"

interface Props {
  user1Id: string
  status: string
  id: string
  amount: number
  betSide: string
  multiplier: number
  user1Metamask: string
  user2Id: string
  user2Metamask: string
  gameId: string
  timestamp: number
  contractAddress: string
  hasUser1Paid: boolean
  isSelected: boolean
}

export const LeftButtons: React.FC<Props> = ({
  user1Id,
  status,
  id,
  amount,
  betSide,
  multiplier,
  user1Metamask,
  user2Id,
  user2Metamask,
  gameId,
  timestamp,
  contractAddress,
  hasUser1Paid,
  isSelected,
}) => {
  return (
    <>
      {isSelected && (
        <div className="flex justify-start flex-grow h-full">
          <User1Metamask
            betId={id}
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
            status={status}
            hasUser1Paid={hasUser1Paid}
          />
          <DeleteBetButton user1Id={user1Id} status={status} id={id} />
        </div>
      )}
    </>
  )
}
