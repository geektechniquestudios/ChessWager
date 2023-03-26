import { AnimatePresence } from "framer-motion"
import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { PayButton } from "../../../PayButton"

interface Props {
  bet: Bet
}

export const User2PayButton: React.FC<Props> = ({ bet }) => {
  const { auth } = Auth.useContainer()
  const { user2Id, hasUser2Paid, timestamp, status } = bet
  const isUser2 = auth.currentUser?.uid === user2Id

  return (
    <AnimatePresence>
      {status === "approved" &&
        isUser2 &&
        !hasUser2Paid &&
        timestamp &&
        timestamp.seconds !== 0 && <PayButton bet={bet} />}
    </AnimatePresence>
  )
}
