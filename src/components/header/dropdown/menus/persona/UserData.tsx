import { getFirestore } from "firebase/firestore"
import { BsPiggyBank } from "react-icons/bs"
import { FaRegHandPeace, FaRegHandshake } from "react-icons/fa"
import { FiPercent } from "react-icons/fi"
import { GiPayMoney } from "react-icons/gi"
import { RiHandCoinLine, RiHeartsLine, RiUserHeartLine } from "react-icons/ri"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { DarkMode } from "../../../../containers/DarkMode"
import { UserDataLoading } from "./LoadingUserData"
import { UserButtonsArea } from "./UserButtonsArea"
import { UserDataTile } from "./UserDataTile"
import { WideDataTile } from "./WideDataTile"

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
  activeMenu: string
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
  activeMenu,
}) => {
  const { isDarkOn } = DarkMode.useContainer()
  const { auth, isWalletConnected } = Auth.useContainer()
  const winPercent =
    betWinCount !== 0 && betFundedCount !== 0
      ? ((betWinCount / betFundedCount) * 100).toFixed(2)
      : 0

  const trust = `${betFundedCount} / ${betAcceptedCount}`

  return (
    <div className="flex flex-col items-center justify-between py-1.5 h-96 w-64">
      {isLoading ? (
        <UserDataLoading />
      ) : (
        <div className="w-60 h-96 flex flex-col justify-between items-center">
          <UserButtonsArea
            id={id ?? ""}
            displayName={displayName ?? ""}
            photoURL={photoURL!}
            activeMenu={activeMenu}
            walletAddress={walletAddress!}
          />
          <img
            src={photoURL}
            className="w-24 h-24 rounded-full grid place-content-center mt-3"
          />
          <div>
            <p className="my-3 flex justify-center">{displayName ?? ""}</p>
          </div>
          <WideDataTile
            name="Total Amount Won"
            icon={<RiHandCoinLine />}
            data={`${parseFloat((amountWon ?? 0).toFixed(6))} AVAX`}
          />
          <div className="w-full grid gap-1.5 grid-cols-2 mb-1">
            <UserDataTile
              data={followerCount}
              name="Followers"
              icon={<RiHeartsLine />}
            />
            <UserDataTile
              data={followingCount}
              name="Following"
              icon={<RiUserHeartLine />}
            />
            <UserDataTile
              data={betWinCount ?? 0}
              name="Bets Won"
              icon={<FaRegHandPeace />}
            />
            <UserDataTile
              data={betFundedCount - betWinCount}
              name="Bets Lost"
              icon={<FaRegHandPeace className="rotate-180" />}
            />
            <UserDataTile data={trust} name="Trust" icon={<FaRegHandshake />} />
            <UserDataTile
              data={winPercent}
              name="Win Percent"
              icon={<FiPercent />}
            />
            <UserDataTile
              data={amountBet ?? 0}
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
              data={amountWon - amountBet}
              name="Net Profit"
              icon={<BsPiggyBank />}
            />
          </div>
        </div>
      )}
    </div>
  )
}
