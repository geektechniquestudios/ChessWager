import { doc, getFirestore, Timestamp, updateDoc } from "firebase/firestore"
import { MdBlockFlipped } from "react-icons/md"
import { firebaseApp } from "../../../../../config"
import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"
import { Price } from "../../../../containers/Price"
import { UserDataState } from "../../../../containers/UserDataState"

const db = getFirestore(firebaseApp)

interface Props {
  id?: string
  amount?: number
  betSide?: "black" | "white"
  multiplier?: number
  status?: string
  user1Id?: string
  user1Metamask?: string
  user1PhotoURL?: string
  user1DisplayName?: string
  hasUser1Paid?: boolean
  user2Id?: string
  user2Metamask?: string
  user2PhotoURL?: string
  user2DisplayName?: string
  hasUser2Paid?: boolean
  createdAt?: Timestamp
  gameId?: string
  timestamp?: Timestamp
  contractAddress?: string
  user1FollowThrough?: number[]
  user2FollowThrough?: number[]
  bet?: Bet
  hasUser1SeenUpdate?: boolean
  hasUser2SeenUpdate?: boolean
}

export const BetsListItem: React.FC<Props> = ({
  id,
  bet,
  user1Id,
  user2Id,
  hasUser1SeenUpdate,
  hasUser2SeenUpdate,
  user1PhotoURL,
  user2PhotoURL,
  user1DisplayName,
  user2DisplayName,
  createdAt,
}) => {
  const { setActiveMenu, setBet, menuStack, setMenuStack } =
    DropdownState.useContainer()
  const { auth } = Auth.useContainer()
  const betTotal =
    bet?.amount ?? 0 + (bet?.amount ?? 0) * (bet?.multiplier ?? 0)
  const { avaxPrice } = Price.useContainer()
  const { userData } = UserDataState.useContainer()

  const isUser1Blocked = userData?.blockedUsers.includes(user1Id ?? "") ?? false
  const isUser2Blocked = userData?.blockedUsers.includes(user2Id ?? "") ?? false

  const isUser1 = user1Id === auth.currentUser!.uid
  const isUser2 = user2Id === auth.currentUser!.uid

  const clickedStyle =
    (isUser1 && !hasUser1SeenUpdate) || (isUser2 && !hasUser2SeenUpdate)
      ? "font-bold dark:text-stone-300 text-stone-900"
      : "dark:text-stone-400 text-stone-700"

  const betRef = id ? doc(db, "lobby", id ?? "") : null

  const markBetAsRead = () => {
    if (!id) return
    if (isUser1 && !hasUser1SeenUpdate) {
      updateDoc(betRef!, {
        hasUser1SeenUpdate: true,
      })
    } else if (isUser2 && !hasUser2SeenUpdate) {
      updateDoc(betRef!, {
        hasUser2SeenUpdate: true,
      })
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      rel="noreferrer noopener"
      className={`color-shift flex h-14 w-64 items-center text-stone-600 hover:bg-stone-300 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200 ${clickedStyle}`}
      onClick={() => {
        setBet(bet!)
        setActiveMenu("bet")
        setMenuStack([...menuStack, "bet"])
        markBetAsRead()
      }}
    >
      <div className="flex h-full w-64 justify-between gap-2 p-2">
        <div className="flex flex-col justify-center gap-2">
          {isUser1Blocked ? (
            <MdBlockFlipped className="h-4 w-4 rounded-full" />
          ) : (
            <img className="h-4 w-4 rounded-full" src={user1PhotoURL} />
          )}
          {isUser2Blocked ? (
            <MdBlockFlipped className="h-4 w-4 rounded-full" />
          ) : (
            <img className="h-4 w-4 rounded-full" src={user2PhotoURL} />
          )}
        </div>
        <div className="flex h-full flex-col justify-center gap-1 overflow-hidden whitespace-nowrap text-sm">
          <div>{isUser1Blocked ? "Blocked User" : user1DisplayName}</div>
          <div>{isUser2Blocked ? "Blocked User" : user2DisplayName}</div>
        </div>
        <div className="flex flex-col justify-center gap-1 text-xs">
          <div>${(betTotal * avaxPrice).toFixed(2)} USD</div>
          {new Date(createdAt!.seconds * 1000).toLocaleDateString("en-US")}
        </div>
        <div></div>
      </div>
    </a>
  )
}
