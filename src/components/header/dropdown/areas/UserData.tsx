import { BsPiggyBank } from "react-icons/bs"
import { FaRegHandshake, FaUsersSlash } from "react-icons/fa"
import { GiPayMoney, GiYinYang } from "react-icons/gi"
import { UserDataPiece } from "../UserDataPiece"
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
          <div className="w-full h-full grid gap-2 grid-cols-2 p-2 text-sm">
            <UserDataPiece dataName="Trust" dataIcon={<FaRegHandshake />} />
            <UserDataPiece dataName="Bet Count" dataIcon={<GiYinYang />} />
            <UserDataPiece dataName="Bets Won" dataIcon={<GiYinYang />} />
            <UserDataPiece dataName="Net Profit" dataIcon={<BsPiggyBank />} />
            <UserDataPiece dataName="Win Percent" dataIcon={<GiYinYang />} />
            <UserDataPiece
              dataName="Total Amount Bet"
              dataIcon={<GiPayMoney />}
            />
            <UserDataPiece
              dataName="Users Blocked"
              dataIcon={<FaUsersSlash />}
            />
          </div>
        </>
      )}
    </div>
  )
}
