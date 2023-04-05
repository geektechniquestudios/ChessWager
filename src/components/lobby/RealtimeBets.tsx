import { useEffect } from "react"
import { BetsState } from "../containers/BetsState"
import { Bet } from "./bet/Bet"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { AnimatePresence, motion } from "framer-motion"
import { Auth } from "../containers/Auth"

interface Props {}

export const RealtimeBets: React.FC<Props> = ({}) => {
  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()
  const { bets, updateRealTimeBets, realtimeBets } = BetsState.useContainer()
  const { user } = Auth.useContainer()

  useEffect(() => {
    updateRealTimeBets()
  }, [bets, mostRecentButton, isDescending, user])

  return (
    <AnimatePresence>
      {realtimeBets.length > 0 && (
        <motion.div
          layout="position"
          initial="hidden"
          animate="visible"
          exit="hidden"
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
        >
          {realtimeBets
            .filter(
              (bet) => bet.status !== "funded" && bet.user1Id !== user?.uid,
            )
            .map((bet, index) => (
              <Bet
                key={bet.id !== "" ? bet.id : index}
                bet={bet}
                index={index}
                isLobbyEnabled
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
