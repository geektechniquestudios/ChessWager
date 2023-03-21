import { IoCloseOutline } from "react-icons/io5"
import { Bet } from "../../../../../interfaces/Bet"
import { Price } from "../../../../containers/Price"

interface Props {
  bet: Bet
}

export const User2BetAmount: React.FC<Props> = ({ bet }) => {
  const { avaxPrice } = Price.useContainer()
  const { multiplier, amount } = bet

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
      <div className="absolute -left-1 top-1.5 -z-10 flex h-5 translate-x-9 items-center justify-start gap-2 rounded-tr-md rounded-br-xl border border-stone-500 bg-zinc-700  pl-4 pr-2">
        <div className="flex text-sm font-bold text-green-100">
          {`$${formatDollars(amount * multiplier * avaxPrice)}`}
        </div>
      </div>
      <div className="grid place-content-center">
        <div className="absolute bottom-0 left-9 -z-20 flex h-4 items-center justify-center rounded-full rounded-tl-none border border-stone-500 bg-stone-600 pl-2 pr-1 text-[0.7rem] font-extrabold text-stone-200">
          <div className="grid h-full place-content-center">
            <IoCloseOutline size="12" color="white" />
          </div>
          {(1 / multiplier).toFixed(2)}
        </div>
      </div>
    </>
  )
}
