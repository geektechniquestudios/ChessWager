import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md"
import { DropdownState } from "../../../../containers/DropdownState"
import { Price } from "../../../../containers/Price"
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
  const { setActiveMenu } = DropdownState.useContainer()
  const { setClickedUserById } = UserMenuState.useContainer()

  return (
    <div className="flex flex-col items-start rounded-md bg-stone-300 dark:bg-stone-500 text-sm w-28 relative border border-stone-400 dark:border-stone-800 overflow-clip">
      <div className="flex justify-center w-full my-2">
        <img src={photoURL} className="h-8 w-8 rounded-full" />
        <div
          className="rounded-full m-1 p-0.5 dark:bg-stone-300 bg-stone-100 grid place-content-center absolute top-0 right-0"
          title={funded ? "Payment Sent" : "No Payment Sent"}
        >
          {funded ? (
            <MdOutlineAttachMoney color="green" />
          ) : (
            <MdOutlineMoneyOffCsred color="red" />
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-stone-800 w-full rounded-b-md p-1 h-full flex flex-col justify-between items-center">
        <button
          className="flex hover:underline"
          onClick={() => {
            setClickedUserById(id)
            setActiveMenu("clickedFromBets")
          }}
        >
          {displayName}
        </button>
        <div className="my-1">
          <div className="flex text-xs">{amount?.toFixed(6)} AVAX</div>
          <div className="flex text-xs">
            ${(amount * avaxPrice).toFixed(2)} USD
          </div>
        </div>
        <div className="flex">{hasUserPaid}</div>
        <div className="flex justify-between w-full">
          <div>{betSide}</div>
          <div
            className={`grid place-content-center rounded-full w-5 h-5 border border-stone-400 dark:border-stone-800 ${
              betSide === "White" ? "bg-white" : "bg-black"
            }`}
          />
        </div>
      </div>
    </div>
  )
}
