import { AnimatePresence } from "framer-motion"
import { Bet } from "../../../../../interfaces/Bet"
import { AuthState } from "../../../../../containers/AuthState"
import { PayButton } from "../../../PayButton"

interface Props {
  bet: Bet
}

export const User1PayButton: React.FC<Props> = ({ bet }) => {
  const { auth } = AuthState.useContainer()
  const { user1Id, hasUser1Paid, timestamp, status } = bet
  const isUser1 = auth.currentUser?.uid === user1Id

  return (
    <AnimatePresence>
      {status === "approved" &&
        isUser1 &&
        !hasUser1Paid &&
        timestamp &&
        timestamp.seconds !== 0 && <PayButton bet={bet} />}
    </AnimatePresence>
  )
}
