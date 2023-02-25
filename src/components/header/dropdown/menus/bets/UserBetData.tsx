import {
  MdBlockFlipped,
  MdOutlineAttachMoney,
  MdOutlineMoneyOffCsred,
} from "react-icons/md"
import { DropdownState } from "../../../../containers/DropdownState"
import { Price } from "../../../../containers/Price"
import { UserDataState } from "../../../../containers/UserDataState"
import { UserMenuState } from "../../../../containers/UserMenuState"

interface Props {
  photoURL: string
  displayName: string
  amount: number
  id: string
  betSide: string
  hasUserPaid: boolean
  funded: boolean
}

export const UserBetData: React.FC<Props> = ({
  photoURL,
  displayName,
  amount,
  id,
  betSide,
  hasUserPaid,
  funded,
}) => {
  const { avaxPrice } = Price.useContainer()
  const { goToMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()
  const { userData } = UserDataState.useContainer()
  const isUserBlocked = userData?.blockedUsers.includes(id) ?? false
  return (
    <div className="relative flex w-28 flex-col items-start overflow-clip rounded-md border border-stone-400 bg-stone-300 text-sm dark:border-stone-800 dark:bg-stone-500">
      <div className="my-2 flex w-full justify-center">
        {isUserBlocked ? (
          <MdBlockFlipped className="h-8 w-8" />
        ) : (
          <img src={photoURL} className="h-8 w-8 rounded-full" />
        )}
        <div
          className="absolute top-0 right-0 m-1 grid place-content-center rounded-full bg-stone-100 p-0.5 dark:bg-stone-300"
          title={funded ? "Payment Sent" : "No Payment Sent"}
        >
          {funded ? (
            <MdOutlineAttachMoney color="green" />
          ) : (
            <MdOutlineMoneyOffCsred color="red" />
          )}
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-between rounded-b-md bg-white p-1 dark:bg-stone-800">
        {isUserBlocked ? (
          <p className="font-bold text-red-600 dark:text-red-400">
            Blocked User
          </p>
        ) : (
          <button
            id="user-bet-data-button"
            className="flex hover:underline"
            onClick={() => {
              setClickedUserById(id)
              goToMenu("clickedUser")
            }}
          >
            {displayName}
          </button>
        )}
        <div className="my-1 rounded-md border border-stone-400 bg-stone-100 p-1 text-sm dark:border-stone-600 dark:bg-stone-700">
          <div className="flex justify-end text-xs">
            {amount?.toFixed(6)} AVAX
          </div>
          <div className="flex justify-end text-xs">
            ${(amount * avaxPrice).toFixed(2)} USD
          </div>
        </div>
        <div className="flex">{hasUserPaid}</div>
        <div className="flex w-full justify-between p-0.5">
          <div>{betSide}</div>
          <div
            className={`grid h-5 w-5 place-content-center rounded-full border border-stone-400 dark:border-stone-800 ${
              betSide === "White" ? "bg-white" : "bg-black"
            }`}
          />
        </div>
      </div>
    </div>
  )
}
