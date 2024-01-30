import { motion } from "framer-motion"
import { AuthState } from "../../containers/AuthState"
import { BetsState } from "../../containers/BetsState"
import { Bet } from "./bet/Bet"

interface Props {}

export const CreatedByUserBets: React.FC<Props> = ({}) => {
  const { user } = AuthState.useContainer()
  const { betsPlacedByUser } = BetsState.useContainer()

  return (
    <>
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
            betsPlacedByUser
              .filter((bet) => bet.status !== "funded")
              .map((bet, index) => (
                <Bet key={bet.id} bet={bet} index={index} />
              ))}
        </motion.div>
      )}
    </>
  )
}
