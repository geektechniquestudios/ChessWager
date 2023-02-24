import { useEffect } from "react"
import { BetsState } from "../containers/BetsState"
import { Bet as BetComponent } from "./bet/Bet"
import { LobbyHeaderState } from "../containers/LobbyHeaderState"
import { UserDataState } from "../containers/UserDataState"
import { GameState } from "../containers/GameState"
import { AnimatePresence, motion } from "framer-motion"

interface Props {}

export const RealtimeBets: React.FC<Props> = ({}) => {
  const { mostRecentButton, isDescending } = LobbyHeaderState.useContainer()
  const { bets, updateRealTimeBets, realTimeBets, clearMapForLobbyChange } =
    BetsState.useContainer()

  const { userData } = UserDataState.useContainer()
  const { gameId } = GameState.useContainer()

  useEffect(() => {
    updateRealTimeBets()
  }, [bets, mostRecentButton, isDescending])

  useEffect(clearMapForLobbyChange, [gameId])

  return (
    <AnimatePresence>
      {realTimeBets.length > 0 && (
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
        >
          {realTimeBets
            ?.filter(
              (bet) =>
                (!userData?.blockedUsers.includes(bet.user1Id) ?? true) &&
                (!userData?.blockedUsers.includes(bet.user2Id) ?? true) &&
                (bet.status ?? "") !== "funded",
            )
            .map((bet, index) => (
              <BetComponent
                key={bet.id}
                {...bet}
                timestamp={bet.timestamp?.seconds}
                index={index}
                isLobbyEnabled
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
