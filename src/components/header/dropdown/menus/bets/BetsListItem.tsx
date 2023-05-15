import { doc, updateDoc } from "firebase/firestore"
import { MdBlockFlipped } from "react-icons/md"
import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { DropdownState } from "../../../../containers/DropdownState"
import { Price } from "../../../../containers/Price"
import { UserDataState } from "../../../../containers/UserDataState"
import { formatDollars } from "../../../../lobby/bet/models/formatDollars"

interface Props {
  bet: Bet
}

export const BetsListItem: React.FC<Props> = ({ bet }) => {
  const {
    id,
    user1Id,
    user2Id,
    hasUser1SeenUpdate,
    hasUser2SeenUpdate,
    user1PhotoURL,
    user2PhotoURL,
    user1DisplayName,
    user2DisplayName,
    createdAt,
  } = bet
  const { goToMenu, setBet } = DropdownState.useContainer()
  const { auth, db } = Auth.useContainer()
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
      : "dark:text-stone-400 text-stone-600"

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
    <a
      rel="noreferrer noopener"
      className={`${clickedStyle} color-shift flex h-14 items-center justify-between whitespace-nowrap px-2 text-stone-600 hover:bg-stone-300 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200`}
      onClick={() => {
        setBet(bet!)
        goToMenu("bet")
        markBetAsRead()
      }}
    >
      <div className="flex h-14 w-full justify-between gap-2">
        <div className="flex w-6 flex-col items-start justify-center gap-2">
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
        <div className="flex w-full justify-between">
          <div className="flex h-full w-32 flex-col justify-center gap-1 text-sm">
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {isUser1Blocked ? "Blocked User" : user1DisplayName}
            </div>
            <div className="line-clamp-1">
              {isUser2Blocked ? "Blocked User" : user2DisplayName}
            </div>
          </div>
          <div className="flex flex-col items-end justify-center gap-1 text-xs">
            <div>${formatDollars(betTotal * avaxPrice)} USD</div>
            {new Date(createdAt!.seconds * 1000).toLocaleDateString("en-US")}
          </div>
        </div>
      </div>
    </a>
  )
}
