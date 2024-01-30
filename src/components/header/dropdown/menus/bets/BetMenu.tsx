import { AuthState } from "../../../../../containers/AuthState"
import { DropdownState } from "../../../../../containers/DropdownState"
import { Menu } from "../../models/Menu"
import { BetMenuHeader } from "./BetMenuHeader"
import { BetMetadataTile } from "./BetMetadataTile"
import { BetOutcomeTile } from "./BetOutcomeTile"
import { UserBetData } from "./UserBetData"

interface Props {}

export const BetMenu: React.FC<Props> = ({}) => {
  const { bet } = DropdownState.useContainer()
  const {
    amount,
    betSide,
    multiplier,
    user1Id,
    user1PhotoURL,
    user1DisplayName,
    hasUser1Paid,
    user2Id,
    user2PhotoURL,
    user2DisplayName,
    hasUser2Paid,
    gameId,
    contractAddress,
    user1TransactionHash,
    user2TransactionHash,
    payoutTransactionHash,
  } = bet ?? {}

  const { user } = AuthState.useContainer()
  const isUser1 = user?.uid === user1Id

  return (
    <Menu
      menuItems={[
        <div>
          {bet && (
            <div className="flex h-full w-full flex-col justify-between gap-2 p-2 text-stone-900 dark:text-stone-300">
              <BetMenuHeader
                contractAddress={contractAddress!}
                gameId={gameId!}
                userTransactionHash={
                  isUser1 ? user1TransactionHash : user2TransactionHash
                }
                payoutTransactionHash={payoutTransactionHash}
              />
              <div className="flex w-full justify-between gap-2">
                <UserBetData
                  photoURL={user1PhotoURL!}
                  displayName={user1DisplayName!}
                  amount={amount!}
                  id={user1Id!}
                  betSide={betSide! === "white" ? "White" : "Black"}
                  hasUserPaid={hasUser1Paid!}
                  funded={hasUser1Paid!}
                  multiplier={multiplier!}
                />
                <UserBetData
                  photoURL={user2PhotoURL!}
                  displayName={user2DisplayName!}
                  amount={amount! * multiplier!}
                  id={user2Id!}
                  betSide={betSide! === "white" ? "Black" : "White"}
                  hasUserPaid={hasUser2Paid!}
                  funded={hasUser2Paid!}
                  multiplier={Number((1 / multiplier!).toFixed(2))}
                />
              </div>

              <BetMetadataTile bet={bet} />
              <BetOutcomeTile bet={bet} />
            </div>
          )}
        </div>,
      ]}
      thisMenu="bet"
    />
  )
}
