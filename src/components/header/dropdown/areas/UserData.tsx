import { AddFriendButton } from "../buttons/AddFriendButton"
import { BlockUserButton } from "../buttons/BlockUserButton"
import { ReportUserButton } from "../buttons/ReportUserButton"
import { SendMessageButton } from "../buttons/SendMessageButton"

interface Props {
  betAcceptedCount?: number
  betFundedCount?: number
  bets?: string[]
  blocked?: string[]
  photoURL?: string
  displayName?: string
  walletAddress?: string
  id?: string
}

export const UserData: React.FC<Props> = ({
  betAcceptedCount,
  betFundedCount,
  bets,
  blocked,
  displayName,
  id,
  photoURL,
  walletAddress,
}) => {
  return (
    <div className="h-96 flex flex-col w-full items-center">
      <img
        src={photoURL}
        className="w-24 h-24 rounded-full grid place-content-center my-9"
      />
      <div className="h-22 flex w-full justify-evenly">
        <SendMessageButton id={id ?? "...Loading"} />
        <BlockUserButton id={id ?? "...Loading"} />
        <ReportUserButton id={id ?? "...Loading"} />
        <AddFriendButton id={id ?? "...Loading"} />
      </div>
      <div className="w-full h-full"></div>
    </div>
  )
}
