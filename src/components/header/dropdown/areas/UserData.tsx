import { BsPiggyBank } from "react-icons/bs"
import { FaRegGem, FaRegHandPeace, FaRegHandshake } from "react-icons/fa"
import { FiPercent } from "react-icons/fi"
import { GiPayMoney } from "react-icons/gi"
import { RiHandCoinLine, RiHeartsLine, RiUserHeartLine } from "react-icons/ri"
import { DarkMode } from "../../../containers/DarkMode"
import { UserDataLoading } from "./LoadingUserData"
import { UserButtons } from "./UserButtons"
import { UserDataTile } from "./UserDataTile"

interface Props {
  betAcceptedCount?: number
  betFundedCount?: number
  photoURL?: string
  displayName?: string
  walletAddress?: string
  id?: string
  amountBet?: number
  amountWon?: number
  betWinCount?: number
  followerCount?: number
  followingCount?: number
  isLoading?: boolean
}

export const UserData: React.FC<Props> = ({
  betAcceptedCount = 0,
  betFundedCount = 0,
  displayName,
  id,
  photoURL,
  walletAddress,
  amountBet = 0,
  amountWon = 0,
  betWinCount = 0,
  followerCount = 0,
  followingCount = 0,
  isLoading,
}) => {
  const { isDarkOn } = DarkMode.useContainer()
  const winPercent =
    betWinCount !== 0 && betFundedCount !== 0
      ? ((betWinCount / betFundedCount) * 100).toFixed(2)
      : 0
  const trust =
    betWinCount !== 0 && betFundedCount !== 0
      ? ((betFundedCount / betAcceptedCount) * 100).toFixed(2)
      : 0

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <UserDataLoading isLoading={isLoading} />
      ) : (
        <>
          <img
            src={photoURL}
            className="w-24 h-24 rounded-full grid place-content-center mt-6"
          />
          <p className="my-3">{displayName ?? ""}</p>
          <UserButtons
            id={id ?? ""}
            displayName={displayName ?? ""}
            photoURL={photoURL!}
          />
          <div className="w-full h-full grid gap-1.5 grid-cols-2 p-2">
            <UserDataTile
              data={followingCount}
              name="Following"
              icon={<RiUserHeartLine />}
            />
            <UserDataTile
              data={followerCount}
              name="Followers"
              icon={<RiHeartsLine />}
            />
            <UserDataTile
              data={`${trust}`}
              name="Trust"
              icon={<FaRegHandshake />}
            />
            <UserDataTile
              data={`${betAcceptedCount ?? 0}`}
              name="Bets"
              icon={<FaRegGem />}
            />
            <UserDataTile
              data={`${betWinCount ?? 0}`}
              name="Bets Won"
              icon={<FaRegHandPeace />}
            />
            <UserDataTile
              data={`${betFundedCount - betWinCount}`}
              name="Bets Lost"
              icon={<FaRegHandPeace className="rotate-180" />}
            />
            <UserDataTile
              data={`${winPercent}`}
              name="Win Percent"
              icon={<FiPercent />}
            />
            <UserDataTile
              data={`${amountBet ?? 0}`}
              name="Total Amount Bet"
              icon={
                <GiPayMoney
                  strokeWidth={35}
                  stroke={isDarkOn ? "#d6d3d1" : "#1c1917"}
                  color="transparent"
                />
              }
            />
            <UserDataTile
              data={`${amountWon - amountBet}`}
              name="Net Profit"
              icon={<BsPiggyBank />}
            />
            <UserDataTile
              data={`${amountWon ?? 0}`}
              name="Total Amount Won"
              icon={<RiHandCoinLine />}
            />
          </div>
          {/* <div className="w-full px-2">
            <WideDataTile
              data={"9430"}
              name="Total Amount Won"
              icon={<RiHandCoinLine />}
            />
          </div> */}
        </>
      )}
    </div>
  )
}
