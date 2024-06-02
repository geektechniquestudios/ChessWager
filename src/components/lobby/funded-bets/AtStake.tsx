import { BetsState } from "../../../containers/BetsState"
import { PriceState } from "../../../containers/PriceState"
import { Bet } from "../../../interfaces/Bet"
import { formatDollars } from "../bet/models/formatDollars"

interface Props {}

export const AtStake: React.FC<Props> = ({}) => {
  const { bets } = BetsState.useContainer()
  const { avaxPrice } = PriceState.useContainer()
  const amountAtStake = formatDollars(
    (bets
      ?.filter((bet: Bet) => bet.status === "funded")
      .map((bet: Bet) => bet.amount + bet.amount * bet.multiplier)
      .reduce((a: number, b: number) => a + b, 0) ?? 0) * avaxPrice,
  )

  return (
    <div className="flex items-center justify-center whitespace-nowrap border-stone-400 border-r-stone-400 px-3 py-1 text-sm dark:border-black dark:border-r-stone-700 dark:text-stone-50">
      <div className="flex items-center justify-center gap-1">
        <p className="font-bold">{`$${amountAtStake}`}</p>
        <p className="">at Stake</p>
      </div>
    </div>
  )
}
