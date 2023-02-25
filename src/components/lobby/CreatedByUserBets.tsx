import { AnimatePresence, motion } from "framer-motion"
import { Auth } from "../containers/Auth"
import { BetsState } from "../containers/BetsState"
import { Bet } from "./bet/Bet"

interface Props {}

export const CreatedByUserBets: React.FC<Props> = ({}) => {
  const { user } = Auth.useContainer()
  const { betsPlacedByUser } = BetsState.useContainer()

  return (
    <AnimatePresence>
      {betsPlacedByUser.length > 0 && (
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
          {user &&
            betsPlacedByUser.map((bet) => (
              <Bet key={bet.id} {...bet} timestamp={bet.timestamp?.seconds} />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
