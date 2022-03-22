import { Auth } from "../../../containers/Auth"
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
  isLoading?: boolean
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
  isLoading,
}) => {
  const { user, auth } = Auth.useContainer()

  const isUser = auth.currentUser?.uid === id

  return (
    <div className="h-96 flex flex-col w-full items-center">
      {isLoading ? (
        <>
          <img
            src={photoURL}
            className="w-24 h-24 rounded-full grid place-content-center mt-9"
          />
          <p className="my-3">{displayName ?? ""}</p>
          {!isUser && (
            <div className="h-22 flex w-full justify-evenly">
              <SendMessageButton id={id ?? "...Loading"} />
              <BlockUserButton id={id ?? "...Loading"} />
              <ReportUserButton id={id ?? "...Loading"} />
              <AddFriendButton id={id ?? "...Loading"} />
            </div>
          )}
          <div className="w-full h-full"></div>
        </>
      ) : (
        <div className="w-full h-full flex-col">
          <div className="flex w-full justify-center">
            <div className="rounded-full h-24 w-24 bg-stone-400 dark:bg-stone-500 my-9 animate-pulse" />
          </div>
          <div className="w-full h-full bg-stone-400 dark:bg-stone-500 animate-pulse" />
        </div>
      )}
    </div>
  )
}
