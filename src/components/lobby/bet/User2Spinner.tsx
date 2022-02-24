import { Auth } from "../../containers/Auth"
import { ClockSpinner } from "./ClockSpinner"

// Forked from https://codepen.io/nikhil8krishnan/pen/rVoXJa, but there's no github repo
// Thank you Nikhil Krishnan!

interface Props {
  status: string
  user1Id: string
}

export const User2Spinner: React.FC<Props> = ({ status, user1Id }) => {
  const { auth } = Auth.useContainer()
  const isUser1 = auth.currentUser?.uid === user1Id
  return <>{status === "ready" && isUser1 && <ClockSpinner />}</>
}
