import { MdBlockFlipped } from "react-icons/md"
import { UserDataLoading } from "./LoadingUserData"
import { UserButtonsArea } from "./UserButtonsArea"
import { UserTiles } from "./UserTiles"
import { User } from "../../../../../interfaces/User"

interface Props {
  user?: User
  isLoading: boolean
}

export const UserData: React.FC<Props> = ({ user, isLoading }) => {
  const {
    betAcceptedCount,
    betFundedCount,
    displayName,
    id,
    photoURL,
    walletAddress,
    amountBet,
    amountWon,
    betWinCount,
    friends,
    joinDate,
    isBanned,
    moderatorLevel,
  } = user ?? {}
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
            isBanned={isBanned!}
            moderatorLevel={moderatorLevel!}
          />
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              {isBanned && (
                <MdBlockFlipped color="red" size={90} title="User Is Banned" />
              )}
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
            {(moderatorLevel ?? 0) == 1 && (
              <p className="text-xs font-extrabold text-green-600">MOD</p>
            )}
            {(moderatorLevel ?? 0) == 2 && (
              <p className="text-xs font-extrabold text-purple-700 dark:text-yellow-400">
                SUPER MOD
              </p>
            )}
          </div>
          <UserTiles
            betWinCount={betWinCount ?? 0}
            betFundedCount={betFundedCount ?? 0}
            betAcceptedCount={betAcceptedCount ?? 0}
            friends={friends ?? []}
            amountBet={amountBet ?? 0}
            amountWon={amountWon ?? 0}
          />
        </div>
      )}
    </div>
  )
}
