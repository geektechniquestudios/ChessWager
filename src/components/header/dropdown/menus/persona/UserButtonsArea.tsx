import { collection, doc, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../../../../../firestore.config"
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
import { ContractDataButton } from "./buttons/ContractDataButton"
import { BanUserButton } from "./buttons/BanUserButton"

const db = getFirestore(firebaseApp)

interface Props {
  id: string
  displayName: string
  photoURL: string
  walletAddress: string
  isBanned: boolean
  moderatorLevel: 0 | 1 | 2
}

export const UserButtonsArea: React.FC<Props> = ({
  id,
  displayName,
  photoURL,
  walletAddress,
  isBanned,
  moderatorLevel,
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
                    className="text-green-700 hover:text-green-700 dark:text-green-300 dark:hover:text-green-300"
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
              <BanUserButton
                id={id}
                displayName={displayName}
                isBanned={isBanned}
                moderatorLevel={moderatorLevel}
              />
            </div>
          </div>
        )}
      </>
      <>
        {isUser && (
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <FriendRequestsButton />
              <BlockedButton />
              <ContractDataButton />
            </div>
            {isWalletConnected ? (
              <a
                className="color-shift rounded-full border border-stone-600 bg-white py-1 px-2 text-xs hover:border-black hover:text-black hover:underline dark:border-stone-400 dark:bg-stone-800 dark:hover:border-white dark:hover:text-stone-200"
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
                className="color-shift rounded-full border border-stone-600 bg-white py-1 px-2 text-xs hover:border-black hover:text-black hover:underline dark:border-stone-400 dark:bg-stone-800 dark:hover:border-white dark:hover:text-stone-200"
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
