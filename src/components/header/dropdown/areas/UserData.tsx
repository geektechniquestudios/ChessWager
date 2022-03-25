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
          <UserButtons
            id={id ?? ""}
            displayName={displayName ?? ""}
            photoURL={photoURL!}
          />
          <div className="w-full h-full"></div>
        </>
      )}
    </div>
  )
}
