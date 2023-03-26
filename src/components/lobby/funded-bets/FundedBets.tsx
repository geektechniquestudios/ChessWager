import "../../../style/scrollbar.scss"
import { AnimatePresence, motion } from "framer-motion"
import { Bet } from "../../../interfaces/Bet"
import { Auth } from "../../containers/Auth"
import { BetsState } from "../../containers/BetsState"
import { Price } from "../../containers/Price"
import { MiniBet } from "./MiniBet"
import { AscDescButton } from "../lobby-header/AscDescButton"
import { RealTimeButton } from "../lobby-header/RealTimeButton"

interface Props {}

export const FundedBets: React.FC<Props> = ({}) => {
  const { avaxPrice } = Price.useContainer()
  const { bets } = BetsState.useContainer()

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

  return (
    <div className="h-9 w-full">
      <div className="flex h-full justify-start gap-1 border-b border-stone-400 bg-stone-50 px-1 dark:border-stone-700 dark:bg-stone-900">
        <AscDescButton />
        <RealTimeButton />
        <div className="flex items-center justify-center gap-1 whitespace-nowrap  border-stone-400 border-r-stone-400 py-1 px-3 text-sm dark:border-black dark:border-r-stone-700 dark:text-stone-50">
          <p className="font-bold">{`$${amountAtStake}`}</p>
          <p className="">at Stake</p>
        </div>
        <div className="scrollbar-funded my-1 flex w-full items-center justify-start gap-1 overflow-x-auto overflow-y-clip rounded-md border border-stone-400 bg-white px-0.5 dark:border-stone-700 dark:bg-stone-800">
          <AnimatePresence>
            {bets && (bets?.length ?? 0) > 0 && (
              <motion.div
                layout="position"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.06,
                      when: "beforeChildren",
                      type: "tween",
                    },
                  },
                  hidden: { opacity: 0 },
                }}
                className="flex items-center justify-start gap-1"
                style={{ direction: "ltr" }}
              >
                {bets
                  .filter(
                    (bet: Bet) =>
                      bet.status === "funded" && isBetRelatedToUser(bet),
                  )
                  .sort((a: Bet, b: Bet) => b.amount - a.amount)
                  .map((bet: Bet) => (
                    <MiniBet key={bet.id} bet={bet} />
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {bets && (bets?.length ?? 0) > 0 && (
              <motion.div
                layout="position"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.06,
                      when: "beforeChildren",
                      type: "tween",
                    },
                  },
                  hidden: { opacity: 0 },
                }}
                className="flex items-center justify-start gap-1"
                style={{ direction: "ltr" }}
              >
                {bets
                  .filter(
                    (bet: Bet) =>
                      bet.status === "funded" && !isBetRelatedToUser(bet),
                  )
                  .sort((a: Bet, b: Bet) => b.amount - a.amount)
                  .map((bet: Bet) => (
                    <MiniBet key={bet.id} bet={bet} />
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
