import "../../style/scrollbar.scss"
import { MiniBet } from "./MiniBet"
import { Price } from "../containers/Price"
import { Auth } from "../containers/Auth"
import { BetsState } from "../containers/BetsState"
import type { Bet } from "../../interfaces/Bet"
import { UserDataState } from "../containers/UserDataState"
import { WindowSize } from "../containers/WindowSize"
import { motion } from "framer-motion"

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
  const ltrOrRtl: "ltr" | "rtl" = width < 768 ? "ltr" : "rtl"
  return (
    <motion.div
      layout
      className="flex h-32 w-full shrink-0 grow-0 flex-col overflow-y-hidden overflow-x-clip whitespace-nowrap rounded-lg border border-stone-400 bg-stone-50 dark:border-stone-600 dark:bg-stone-800 md:h-full md:w-40"
      style={{ direction: "rtl" }}
    >
      <div className="flex w-full justify-between overflow-x-clip bg-gradient-to-r from-stone-200 via-stone-200 to-stone-200 px-0.5 py-1 dark:from-stone-800 dark:via-stone-800 dark:to-stone-800 dark:text-stone-50 md:to-transparent md:dark:to-transparent">
        <div />
        <div
          className="text-md mx-1 md:whitespace-nowrap"
          style={{ direction: "ltr" }}
        >{`$${amountAtStake} at Stake`}</div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-stone-600 to-transparent" />
      <div className="flex h-full flex-col overflow-y-hidden overflow-x-visible">
        <div
          style={{ direction: ltrOrRtl }}
          className="scrollbar-funded mx-1 flex h-full overflow-y-auto overflow-x-visible md:mx-0 md:flex-col"
        >
          <div
            className="flex grow overflow-x-visible md:h-0 md:flex-col"
            style={{ direction: "ltr" }}
          >
            {bets
              ?.filter(
                (bet: Bet) =>
                  bet.status === "funded" && isBetRelatedToUser(bet),
              )
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
          <div
            className="flex grow overflow-x-visible md:h-0 md:flex-col"
            style={{ direction: "ltr" }}
          >
            {bets
              ?.filter(
                (bet: Bet) =>
                  bet.status === "funded" &&
                  !isBetRelatedToUser(bet) &&
                  (!userData?.blockedUsers.includes(bet.user1Id) ?? false) &&
                  (!userData?.blockedUsers.includes(bet.user2Id) ?? false),
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
        </div>
      </div>
    </motion.div>
  )
}
