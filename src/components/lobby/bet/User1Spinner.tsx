import { Auth } from "../../containers/Auth"
import { ClockSpinner } from "./ClockSpinner"

interface Props {
  user2Id: string
  status: string
}

export const User1Spinner: React.FC<Props> = ({ user2Id, status }) => {
  const { auth } = Auth.useContainer()
  const isUser2 = auth.currentUser?.uid === user2Id
  return <>{status === "pending" && isUser2 && <ClockSpinner />}</>
}
