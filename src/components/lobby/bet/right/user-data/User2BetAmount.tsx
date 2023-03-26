import { IoCloseOutline } from "react-icons/io5"
import { Bet } from "../../../../../interfaces/Bet"
import { DarkMode } from "../../../../containers/DarkMode"
import { Price } from "../../../../containers/Price"
import { formatDollars } from "../../models/formatDollars"

interface Props {
  bet: Bet
}

export const User2BetAmount: React.FC<Props> = ({ bet }) => {
  const { avaxPrice } = Price.useContainer()
  const { multiplier, amount } = bet
  const { isDarkOn } = DarkMode.useContainer()

  return (
    <>
      <div className="user-bet-amount absolute -left-1 top-1.5 -z-10 flex h-5 translate-x-9 items-center justify-start gap-2 rounded-tr-md rounded-br-xl border pl-4 pr-2">
        <div className="flex text-sm font-bold">
          {`$${formatDollars(amount * multiplier * avaxPrice)}`}
        </div>
      </div>
      <div className="multiplier absolute bottom-0 left-9 -z-20 flex h-4 items-center justify-center rounded-full rounded-tl-none border pl-2 pr-1 text-[0.7rem] font-extrabold">
        <div className="grid h-full place-content-center">
          <IoCloseOutline size="12" color={isDarkOn ? "white" : "black"} />
        </div>
        {(1 / multiplier).toFixed(2)}
      </div>
    </>
  )
}
