import { Bet } from "../../../../../interfaces/Bet"
import { Price } from "../../../../containers/Price"
import { IoCloseOutline } from "react-icons/io5"

interface Props {
  bet: Bet
}

export const User1BetAmount: React.FC<Props> = ({ bet }) => {
  const { amount, multiplier } = bet
  const { avaxPrice } = Price.useContainer()

  const formatDollars = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
    } else {
      return num.toFixed(2)
    }
  }

  return (
    <>
      <div className="absolute -right-1 top-1.5 -z-10 flex h-5 -translate-x-9 items-center justify-start gap-2 rounded-tl-md rounded-bl-xl border border-stone-500 bg-zinc-700 pl-2 pr-4">
        <div className="flex text-sm font-bold text-green-100">
          ${`${formatDollars(amount * avaxPrice)}`}
        </div>
      </div>
      <div className="absolute bottom-0 right-9 -z-20 flex h-4 items-center justify-center rounded-full rounded-tr-none border border-stone-500 bg-stone-600 pl-1 pr-2 text-[0.7rem] font-extrabold text-stone-200">
        <div className="grid h-full place-content-center">
          <IoCloseOutline size="12" color="white" />
        </div>
        {multiplier.toFixed(2)}
      </div>
    </>
  )
}
