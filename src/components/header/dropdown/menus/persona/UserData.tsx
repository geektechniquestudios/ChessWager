import { Timestamp } from "firebase/firestore"
import { BsPiggyBank } from "react-icons/bs"
import { FaRegHandPeace, FaRegHandshake } from "react-icons/fa"
import { FiPercent, FiUsers } from "react-icons/fi"
import { GiPayMoney } from "react-icons/gi"
import { RiHandCoinLine } from "react-icons/ri"
import { DarkMode } from "../../../../containers/DarkMode"
import { BanUserButton } from "./buttons/BanUserButton"
import { UserDataLoading } from "./LoadingUserData"
import { UserButtonsArea } from "./UserButtonsArea"
import { UserDataTile } from "./UserDataTile"

interface Props {
  betAcceptedCount?: number
  betFundedCount?: number
  photoURL?: string
  displayName?: string
  searchableDisplayName?: string
  walletAddress?: string
  id?: string
  amountBet?: number
  amountWon?: number
  betWinCount?: number
  hasNewMessage?: boolean
  hasNewNotifications?: boolean
  blockedUsers?: string[]
  sentFriendRequests?: string[]
  redactedFriendRequests?: string[]
  friends?: string[]
  joinDate?: Timestamp
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
  friends,
  joinDate,
  isLoading,
}) => {
  const { isDarkOn } = DarkMode.useContainer()
  const winPercent =
    betWinCount !== 0 && betFundedCount !== 0
      ? ((betWinCount / betFundedCount) * 100).toFixed(2)
      : 0

  const trust = `${betFundedCount} / ${betAcceptedCount}`
  return (
    <div className="flex h-96 w-64 flex-col items-center justify-between py-1.5">
      {isLoading ? (
        <UserDataLoading />
      ) : (
        <div className="flex h-96 w-60 flex-col items-center justify-between">
          <UserButtonsArea
            id={id ?? ""}
            displayName={displayName ?? ""}
            photoURL={photoURL!}
            walletAddress={walletAddress!}
          />
          <div className="relative">
            <div className="absolute bottom-0 right-0 translate-x-7 translate-y-1.5">
              <BanUserButton id={id ?? ""} displayName={displayName ?? ""} />
            </div>
            <img
              src={photoURL}
              className="grid h-24 w-24 place-content-center rounded-full border border-stone-400 dark:border-stone-500"
            />
          </div>

          <div className="my-2 flex flex-col items-center justify-center gap-0.5">
            <p className="text-lg">{displayName ?? ""}</p>
            {joinDate && (
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {`Joined ${new Date(
                  joinDate!.seconds * 1000,
                ).toLocaleDateString("en-US")}`}
              </p>
            )}
          </div>

          <div className="mb-1 grid w-full grid-cols-2 gap-1.5 text-sm">
            <UserDataTile data={trust} name="Trust" icon={<FaRegHandshake />} />
            <UserDataTile
              data={friends?.length ?? 0}
              name="Friends"
              icon={<FiUsers />}
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
            <UserDataTile
              data={winPercent}
              name="Win Percent"
              icon={<FiPercent />}
            />
            <UserDataTile
              data={amountBet.toFixed(4) ?? 0}
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
              name="Total AVAX Won"
              icon={<RiHandCoinLine />}
              data={parseFloat((amountWon ?? 0).toFixed(4))}
            />
            <UserDataTile
              data={(amountWon - amountBet).toFixed(4) ?? 0}
              name="Net Profit"
              icon={<BsPiggyBank />}
            />
          </div>
        </div>
      )}
    </div>
  )
}
