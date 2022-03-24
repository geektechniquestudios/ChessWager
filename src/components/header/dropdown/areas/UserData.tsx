import { BetCount } from "../user-data-pieces/BetCount"
import { BetsWon } from "../user-data-pieces/BetsWon"
import { NetProfit } from "../user-data-pieces/NetProfit"
import { NumberBlocked } from "../user-data-pieces/NumberBlocked"
import { TotalAmountBet } from "../user-data-pieces/TotalAmountBet"
import { Trust } from "../user-data-pieces/Trust"
import { WinPercent } from "../user-data-pieces/WinPercent"
import { UserDataLoading } from "./LoadingUserData"
import { UserButtons } from "./UserButtons"

interface Props {
  photoURL?: string
  displayName?: string
  walletAddress?: string
  id?: string
  isLoading?: boolean
}

export const UserData: React.FC<Props> = ({
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
          <div className="w-full h-full grid gap-2 grid-cols-2 p-2 text-sm">
            <Trust />
            <BetCount />
            <BetsWon />
            <WinPercent />
            <TotalAmountBet />
            <NetProfit />
            <NumberBlocked />
          </div>
        </>
      )}
    </div>
  )
}
