import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { PayButton } from "../../../PayButton"

interface Props {
  bet: Bet
}

export const User1PayButton: React.FC<Props> = ({ bet }) => {
  const { auth } = Auth.useContainer()
  const { user1Id, hasUser1Paid, timestamp, status } = bet
  const isUser1 = auth.currentUser?.uid === user1Id

  return (
    <>
      {status === "approved" &&
        isUser1 &&
        !hasUser1Paid &&
        timestamp &&
        timestamp.seconds !== 0 && <PayButton bet={bet} />}
    </>
  )
}
