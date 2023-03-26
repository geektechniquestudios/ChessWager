import { Bet } from "../../../../../interfaces/Bet"
import { Price } from "../../../../containers/Price"
import { IoCloseOutline } from "react-icons/io5"
import { DarkMode } from "../../../../containers/DarkMode"
import { formatDollars } from "../../models/formatDollars"

interface Props {
  bet: Bet
}

export const User1BetAmount: React.FC<Props> = ({ bet }) => {
  const { amount, multiplier } = bet
  const { avaxPrice } = Price.useContainer()
  const { isDarkOn } = DarkMode.useContainer()

  return (
    <>
      <div className="user-bet-amount absolute -right-1 top-1.5 -z-10 flex h-5 -translate-x-9 items-center justify-start gap-2 rounded-tl-md rounded-bl-xl border pl-2 pr-4">
        <div className="flex text-sm font-bold">
          ${`${formatDollars(amount * avaxPrice)}`}
        </div>
      </div>
      <div className="multiplier absolute bottom-0 right-9 -z-20 flex h-4 items-center justify-center rounded-full rounded-tr-none border pl-1 pr-2 text-[0.7rem] font-extrabold">
        <div className="grid h-full place-content-center">
          <IoCloseOutline size="12" color={isDarkOn ? "white" : "black"} />
        </div>
        {multiplier.toFixed(2)}
      </div>
    </>
  )
}
