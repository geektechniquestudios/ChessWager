import "../../style/scrollbar.scss"
import { MiniBet } from "./MiniBet"
import { Price } from "../containers/Price"
import { Auth } from "../containers/Auth"
import { BetsState } from "../containers/BetsState"
import type { Bet } from "../../interfaces/Bet"
import { UserDataState } from "../containers/UserDataState"
import { WindowSize } from "../containers/WindowSize"

interface Props {}

export const FundedBets: React.FC<Props> = () => {
  const { avaxPrice } = Price.useContainer()
  const { bets } = BetsState.useContainer()
  const { userData } = UserDataState.useContainer()

  const { auth } = Auth.useContainer()
  const isBetRelatedToUser = (bet: Bet): boolean => {
    return (
      auth.currentUser?.uid === bet.user1Id ||
      auth.currentUser?.uid === bet.user2Id
    )
  }

  const amountAtStake = (
    (bets
      ?.filter((bet: Bet) => bet.status === "funded")
      .map((bet: Bet) => bet.amount + bet.amount * bet.multiplier)
      .reduce((a: number, b: number) => a + b, 0) ?? 0) * avaxPrice
  )
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const { width } = WindowSize.useContainer()
  const ltrOrRtl: "ltr" | "rtl" = width < 640 ? "ltr" : "rtl"
  return (
    <div
      className="flex shrink flex-col overflow-y-hidden overflow-x-visible sm:w-52"
      style={{ direction: "rtl" }}
    >
      <div className="flex w-full justify-between bg-gradient-to-r from-stone-300 via-stone-300 to-transparent px-0.5 py-1 dark:from-stone-800 dark:via-stone-800 dark:to-transparent dark:text-stone-50">
        <div />
        <div
          className="mx-1 text-sm"
          style={{ direction: "ltr" }}
        >{`$${amountAtStake} at Stake`}</div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-stone-600 to-transparent" />
      <div className="flex h-full flex-col overflow-y-hidden overflow-x-visible">
        <div
          style={{ direction: ltrOrRtl }}
          className="scrollbar-funded flex h-full overflow-y-auto overflow-x-visible sm:flex-col"
        >
          <div
            className="flex overflow-x-visible sm:h-0 sm:flex-col"
            style={{ direction: "ltr" }}
          >
            {bets
              ?.filter(
                (bet: Bet) =>
                  bet.status === "funded" && isBetRelatedToUser(bet),
              )
              .sort((a: Bet, b: Bet) => b.amount - a.amount)
              .map((bet: Bet) => (
                <MiniBet
                  key={bet.id}
                  amount={bet.amount}
                  betSide={bet.betSide}
                  multiplier={bet.multiplier}
                  user1PhotoURL={bet.user1PhotoURL}
                  user2PhotoURL={bet.user2PhotoURL}
                  user1DisplayName={bet.user1DisplayName}
                  user2DisplayName={bet.user2DisplayName}
                />
              ))}
          </div>
          <div
            className="flex overflow-x-visible sm:h-0 sm:flex-col"
            style={{ direction: "ltr" }}
          >
            {bets
              ?.sort((a: Bet, b: Bet) => b.amount - a.amount)
              .map((bet: Bet) => (
                <MiniBet
                  key={bet.id}
                  amount={bet.amount}
                  betSide={bet.betSide}
                  multiplier={bet.multiplier}
                  user1PhotoURL={bet.user1PhotoURL}
                  user2PhotoURL={bet.user2PhotoURL}
                  user1DisplayName={bet.user1DisplayName}
                  user2DisplayName={bet.user2DisplayName}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
