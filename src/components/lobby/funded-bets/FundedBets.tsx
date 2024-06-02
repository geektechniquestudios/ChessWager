import { AnimatePresence, motion } from "framer-motion"
import { Bet } from "../../../interfaces/Bet"
import "../../../style/scrollbar.scss"
import { AuthState } from "../../../containers/AuthState"
import { BetsState } from "../../../containers/BetsState"
import { AscDescButton } from "../lobby-header/AscDescButton"
import { RealtimeButton } from "../lobby-header/RealTimeButton"
import { MiniBet } from "./MiniBet"
import { AtStake } from "./AtStake"

interface Props {}

export const FundedBets: React.FC<Props> = ({}) => {
  const { bets } = BetsState.useContainer()
  const { auth } = AuthState.useContainer()

  const isBetRelatedToUser = (bet: Bet): boolean => {
    return (
      auth.currentUser?.uid === bet.user1Id ||
      auth.currentUser?.uid === bet.user2Id
    )
  }

  return (
    <div className="h-11 w-full">
      <div className="flex h-full justify-start gap-1 border-b border-stone-400 bg-stone-50 px-1 dark:border-stone-700 dark:bg-stone-900">
        <div className="flex gap-1 py-0.5">
          <AscDescButton />
          <RealtimeButton />
          <AtStake />
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
