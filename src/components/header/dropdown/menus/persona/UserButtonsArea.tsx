import { collection, doc, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { AddFriendButton } from "./buttons/AddFriendButton"
import { BlockUserButton } from "./buttons/BlockUserButton"
import { ReportUserButton } from "./buttons/ReportUserButton"
import { SendMessageButton } from "./buttons/SendMessageButton"
import { BlockedButton } from "./buttons/BlockedButton"
import { BsWallet2 } from "react-icons/bs"
import { RemoveFriendButton } from "./buttons/RemoveFriendButton"
import { CancelPendingRequestButton } from "./buttons/CancelPendingRequestButton"
import { FriendRequestsButton } from "./buttons/FriendRequestsButton"
import { UserDataState } from "../../../../containers/UserDataState"

const db = getFirestore(firebaseApp)

interface Props {
  id: string
  displayName: string
  photoURL: string
  walletAddress: string
}

export const UserButtonsArea: React.FC<Props> = ({
  id,
  displayName,
  photoURL,
  walletAddress,
}) => {
  const { userData } = UserDataState.useContainer()
  const { auth, isWalletConnected, connectWallet } = Auth.useContainer()

  const isFriend = userData?.friends.includes(id) ?? false
  const isUser = auth.currentUser?.uid === id
  const userDoc = doc(db, "users", auth.currentUser!.uid)
  const blockedUsers = collection(userDoc, "blocked")

  return (
    <>
      <>
        {!isUser && displayName !== "" && (
          <div className="h-22 my-1 flex w-full justify-between">
            <div className="flex gap-3">
              <SendMessageButton
                id={id ?? ""}
                displayName={displayName}
                photoURL={photoURL}
              />
              {(!userData!.sentFriendRequests.includes(id) ||
                userData!.redactedFriendRequests.includes(id)) &&
                !isFriend && <AddFriendButton id={id ?? ""} />}

              {userData!.sentFriendRequests.includes(id) &&
                !userData!.redactedFriendRequests.includes(id) &&
                !isFriend && (
                  <CancelPendingRequestButton
                    className="text-green-700 dark:text-green-300 hover:text-green-700 dark:hover:text-green-300"
                    id={id}
                  />
                )}
            </div>

            <div className="flex gap-3">
              {isFriend && <RemoveFriendButton id={id} />}
              <BlockUserButton
                id={id ?? ""}
                displayName={displayName}
                photoURL={photoURL}
                blockedUsers={blockedUsers}
              />
              <ReportUserButton id={id ?? ""} />
            </div>
          </div>
        )}
      </>
      <>
        {isUser && (
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <FriendRequestsButton />
              <BlockedButton />
            </div>
            {isWalletConnected ? (
              <a
                className="rounded-full border border-stone-400 dark:border-stone-800 py-1 px-2 bg-white hover:underline dark:bg-stone-800 dark:hover:text-stone-200 text-xs color-shift hover:text-black hover:border-black dark:hover:border-white"
                title={"View Wallet on Snowtrace"}
                href={"https://snowtrace.io/address/" + walletAddress}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex gap-1">
                  <div className="mt-0.5">
                    <BsWallet2 />
                  </div>
                  {walletAddress?.substring(0, 6)}...
                  {walletAddress?.substring(
                    walletAddress.length - 4,
                    walletAddress.length,
                  )}
                </div>
              </a>
            ) : (
              <a
                className="rounded-full border border-stone-400 dark:border-stone-800 py-1 px-2 bg-white hover:underline dark:bg-stone-800 dark:hover:text-stone-200 text-xs color-shift hover:text-black hover:border-black dark:hover:border-white"
                title={"Connect Wallet"}
                onClick={connectWallet}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex gap-1">
                  <div className="mt-0.5">
                    <BsWallet2 />
                  </div>
                  {walletAddress?.substring(0, 6)}...
                  {walletAddress?.substring(
                    walletAddress.length - 4,
                    walletAddress.length,
                  )}
                </div>
              </a>
            )}
          </div>
        )}
      </>
    </>
  )
}
