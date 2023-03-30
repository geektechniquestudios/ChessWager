import { useEffect } from "react"
import { BetsState } from "../containers/BetsState"
import { Bet } from "./bet/Bet"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { AnimatePresence, motion } from "framer-motion"
import { Auth } from "../containers/Auth"
import { GameState } from "../containers/GameState"

interface Props {}

export const RealtimeBets: React.FC<Props> = ({}) => {
  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()
  const { bets, updateRealTimeBets, realTimeBets } = BetsState.useContainer()
  const { gameId } = GameState.useContainer()
  const { user } = Auth.useContainer()

  useEffect(() => {
    updateRealTimeBets()
  }, [bets, mostRecentButton, isDescending, user, gameId])

  useEffect(() => {
    // setSelectedBetMap(new Map())
  }, [])

  return (
    <AnimatePresence>
      {realTimeBets.length > 0 && (
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
          {realTimeBets
            .filter((bet) => bet.status !== "funded")
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
