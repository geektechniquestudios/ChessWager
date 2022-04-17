import { Timestamp } from "firebase/firestore"
import { MdBlockFlipped } from "react-icons/md"
import { Bet } from "../../../../../interfaces/Bet"
import { DropdownState } from "../../../../containers/DropdownState"
import { Price } from "../../../../containers/Price"
import { UserDataState } from "../../../../containers/UserDataState"

interface Props {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  id: string
  amount: number
  betSide: "black" | "white"
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user1DisplayName: string
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  user2DisplayName: string
  hasUser2Paid: boolean
  createdAt: Timestamp
  gameId: string
  timestamp: Timestamp
  contractAddress: string
  user1FollowThrough: number[]
  user2FollowThrough: number[]
  bet: Bet
}

export const BetsListItem: React.FC<Props> = ({ leftIcon, rightIcon, bet }) => {
  const { setActiveMenu, setBet, menuStack, setMenuStack } =
    DropdownState.useContainer()
  const betTotal = bet.amount + bet.amount * bet.multiplier
  const { avaxPrice } = Price.useContainer()
  const { userData } = UserDataState.useContainer()
  const isUser1Blocked = userData.blockedUsers.includes(bet.user1Id)
  const isUser2Blocked = userData.blockedUsers.includes(bet.user2Id)
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      rel="noreferrer"
      className={`h-14 w-64 flex items-center hover:bg-stone-300 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-600 dark:hover:text-stone-200 color-shift`}
      onClick={() => {
        setBet(bet)
        setActiveMenu("bet")
        setMenuStack([...menuStack, "bet"])
      }}
    >
      <div className="flex h-full w-64 justify-between gap-2 p-2">
        <div className="flex flex-col justify-center gap-2">
          {isUser1Blocked ? (
            <MdBlockFlipped className="w-4 h-4 rounded-full" />
          ) : (
            <img className="w-4 h-4 rounded-full" src={bet.user1PhotoURL} />
          )}
          {isUser2Blocked ? (
            <MdBlockFlipped className="w-4 h-4 rounded-full" />
          ) : (
            <img className="w-4 h-4 rounded-full" src={bet.user2PhotoURL} />
          )}
        </div>
        <div className="flex flex-col justify-center h-full overflow-hidden text-sm text-stone-900 dark:text-stone-400 whitespace-nowrap gap-1">
          <div>{isUser1Blocked ? "Blocked User" : bet.user1DisplayName}</div>
          <div>{isUser2Blocked ? "Blocked User" : bet.user2DisplayName}</div>
        </div>
        <div className="flex flex-col justify-center text-xs gap-1">
          <div>${(betTotal * avaxPrice).toFixed(2)} USD</div>
          {new Date(bet.createdAt!.seconds * 1000).toLocaleDateString("en-US")}
        </div>
        <div></div>
      </div>
    </a>
  )
}
