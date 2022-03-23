import { UserDataLoading } from "./LoadingUserData"
import { UserButtons } from "./UserButtons"

interface Props {
  betAcceptedCount?: number
  betFundedCount?: number
  bets?: string[]
  blocked?: string[]
  photoURL?: string
  displayName?: string
  walletAddress?: string
  id?: string
  isLoading?: boolean
}

export const UserData: React.FC<Props> = ({
  betAcceptedCount,
  betFundedCount,
  bets,
  blocked,
  displayName,
  id,
  photoURL,
  walletAddress,
  isLoading,
}) => {
  return (
    <div className="h-96 flex flex-col items-center">
      {isLoading ? (
        <UserDataLoading isLoading={isLoading} />
      ) : (
        <>
          <img
            src={photoURL}
            className="w-24 h-24 rounded-full grid place-content-center mt-9"
          />
          <p className="my-3">{displayName ?? ""}</p>
          <UserButtons id={id ?? ""} />
          <div className="w-full h-full grid gap-2 grid-cols-2 grid-rows-4 p-2 text-sm">
            <div>Follow-Through: {betFundedCount}/{betAcceptedCount}</div>
            <div>Bet Count: {bets}</div>
            <div>Bets Won: </div>
            <div>Win%: </div>
            <div>Total Amount Bet: </div>
            <div>Net Profit: </div>
            <div>Blocked: {blocked}</div>

          </div>
        </>
      )}
    </div>
  )
}
