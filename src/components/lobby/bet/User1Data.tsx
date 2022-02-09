import { User1BetAmount } from "./User1BetAmount"
import { User1FollowThrough } from "./User1FollowThrough"
import { User1Image } from "./User1Image"
import { User1Metamask } from "./User1Metamask"

interface Props {
  user1FollowThrough: number[]
  user1PhotoURL: string
  user1DisplayName: string
  amount: number
  multiplier: number
  id: string
  betSide: string
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

export const User1Data: React.FC<Props> = ({
  user1FollowThrough,
  user1PhotoURL,
  user1DisplayName,
  amount,
  multiplier,
  id,
  betSide,
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
  return (
    <div className="flex justify-center align-middle w-full border-1 rounded-sm bg-stone-300 px-1 py-0.5">
      <div className="flex justify-between w-full gap-2.5">
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
        <User1Image
          user1PhotoURL={user1PhotoURL}
          user1DisplayName={user1DisplayName}
        />
        <User1FollowThrough user1FollowThrough={user1FollowThrough} />
        <User1BetAmount amount={amount} multiplier={multiplier} />
      </div>
    </div>
  )
}
