import { LeaveButton } from "./LeaveButton"
import { User2Metamask } from "./User2Metamask"

interface Props {
  user2Id: string
  status: string
  user1Id: string
  id: string
  amount: number
  betSide: string
  multiplier: number
  user1Metamask: string
  user2Metamask: string
  gameId: string
  timestamp: number
  contractAddress: string
  hasUser2Paid: boolean
  isSelected: boolean
}

export const RightButtons: React.FC<Props> = ({
  user2Id,
  status,
  user1Id,
  id,
  amount,
  betSide,
  multiplier,
  user1Metamask,
  user2Metamask,
  gameId,
  timestamp,
  contractAddress,
  hasUser2Paid,
  isSelected,
}) => {
  return (
    <>
      {isSelected && (
        <div className="flex h-full justify-between">
          <div className="flex">
            <User2Metamask
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
              hasUser2Paid={hasUser2Paid}
            />
          </div>
          <div className="flex">
            <LeaveButton user2Id={user2Id} status={status} id={id} />
          </div>
        </div>
      )}
    </>
  )
}
