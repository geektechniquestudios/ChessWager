import { AnimatePresence, motion } from "framer-motion"
import { useOrbitAnimation } from "./useOrbitAnimation"
import { AuthState } from "../../../../../containers/AuthState"
import { Bet } from "../../../../../interfaces/Bet"

interface Props {
  bet: Bet
  isUserThinking: boolean
  hasUserPaid: boolean
}

export const ActivityOrb: React.FC<Props> = ({
  bet,
  isUserThinking,
  hasUserPaid,
}) => {
  const { user } = AuthState.useContainer()

  const isUser1 = user?.uid === bet.user1Id
  const isUser2 = user?.uid === bet.user2Id

  const isAwaitingPayment = bet.status === "approved"

  const awaitingPaymentStyle = isAwaitingPayment ? "!bg-green-500" : ""
  const userIsThinkingStyle = isUserThinking ? "bg-sky-500" : ""

  const shouldShow =
    (isUserThinking || isAwaitingPayment) &&
    (isUser1 || isUser2) &&
    !hasUserPaid
  const { x, y } = useOrbitAnimation(shouldShow)

  return (
    <div className="color-shift pointer-events-none absolute inset-0">
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            className="absolute inset-0 z-50 m-auto h-3 w-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            exit={{ opacity: 0 }}
            style={{
              x,
              y,
            }}
          >
            <div className="relative flex h-3 w-3 blur-[1px]">
              <div
                className={`${awaitingPaymentStyle} ${userIsThinkingStyle} absolute inline-flex h-full w-full animate-[ping_2s_ease-in-out_infinite] rounded-full`}
              />
              <div
                className={`${awaitingPaymentStyle} ${userIsThinkingStyle} inline-flex h-3 w-3 rounded-full`}
              />
              <div className="absolute inset-0 m-auto h-1 w-1 animate-pulse bg-white blur-[1px]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
