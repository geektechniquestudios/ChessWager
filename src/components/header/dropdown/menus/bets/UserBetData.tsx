import {
  MdBlockFlipped,
  MdOutlineAttachMoney,
  MdOutlineMoneyOffCsred,
} from "react-icons/md"
import { DropdownState } from "../../../../../containers/DropdownState"
import { PriceState } from "../../../../../containers/PriceState"
import { UserDataState } from "../../../../../containers/UserDataState"
import { UserMenuState } from "../../../../../containers/UserMenuState"
import { formatDollars } from "../../../../lobby/bet/models/formatDollars"

interface Props {
  photoURL: string
  displayName: string
  amount: number
  id: string
  betSide: string
  hasUserPaid: boolean
  funded: boolean
  multiplier: number
}

export const UserBetData: React.FC<Props> = ({
  photoURL,
  displayName,
  amount,
  id,
  betSide,
  hasUserPaid,
  funded,
  multiplier,
}) => {
  const { avaxPrice } = PriceState.useContainer()
  const { goToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { userData } = UserDataState.useContainer()
  const isUserBlocked = userData?.blockedUsers.includes(id) ?? false
  return (
    <div className="relative flex w-full flex-col items-start overflow-clip rounded-md border border-stone-400 bg-stone-300 text-sm dark:border-stone-500 dark:bg-stone-600">
      <div className="my-2 flex w-full justify-center">
        {isUserBlocked ? (
          <MdBlockFlipped className="h-8 w-8" />
        ) : (
          <button
            onClick={() => {
              setClickedUserById(id)
              goToMenu("clickedUser")
            }}
            className="h-9 w-9 rounded-full"
          >
            <img src={photoURL} className="h-9 w-9 rounded-full" />
          </button>
        )}
        <div
          className="absolute right-0 top-0 m-1 grid place-content-center rounded-full bg-stone-100 p-0.5 dark:bg-stone-300"
          title={funded ? "Payment Sent" : "No Payment Sent"}
        >
          {funded ? (
            <MdOutlineAttachMoney color="green" />
          ) : (
            <MdOutlineMoneyOffCsred color="red" />
          )}
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-between bg-white p-1 dark:bg-stone-800">
        {isUserBlocked ? (
          <p className="font-bold text-red-600 dark:text-red-400">
            Blocked User
          </p>
        ) : (
          <button
            id="user-bet-data-button"
            className="h-full hover:underline"
            onClick={() => {
              setClickedUserById(id)
              goToMenu("clickedUser")
            }}
          >
            {displayName}
          </button>
        )}
        <div className="my-1 w-full rounded-md border border-stone-400 bg-stone-100 p-1 text-sm dark:border-stone-600 dark:bg-stone-700">
          <div className="flex justify-end text-xs">
            {amount?.toFixed(6)} AVAX
          </div>
          <div className="flex justify-end text-xs">
            ${formatDollars(amount * avaxPrice)} USD
          </div>
          <div className="flex w-full justify-end">
            <div className="grid h-5 place-content-center rounded-full border px-2 text-xs dark:border-stone-500 dark:bg-stone-800">
              x{multiplier}
            </div>
          </div>
        </div>
        <div className="flex">{hasUserPaid}</div>
      </div>
      <div className="flex w-full justify-between p-1 font-bold">
        <div>{betSide}</div>
        <div
          className={`grid h-5 w-5 place-content-center rounded-full border ${
            betSide === "White"
              ? "border-stone-900 bg-white"
              : "border-stone-700 bg-black"
          }`}
        />
      </div>
    </div>
  )
}
