import { PriceState } from "../../../containers/PriceState"

interface Props {
  multiplier: number
  betAmount: number
}

export const TheirBet: React.FC<Props> = ({ multiplier, betAmount }) => {
  const { avaxPrice } = PriceState.useContainer()
  return (
    <div className="wager-form-tile flex px-1">
      <p className="m-2 grid place-content-center font-bold text-stone-900 dark:text-stone-300">
        Their Bet
      </p>
      <div className="m-2 border border-stone-900 dark:border-stone-500" />
      <div className="w-full">
        <div className="my-1 flex justify-center font-bold">
          <p className="m-1 text-stone-900 dark:text-stone-300">{`USD ${(
            multiplier *
            betAmount *
            avaxPrice
          )
            .toFixed(2)
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</p>
        </div>
        <div className="my-1 flex justify-center font-bold">
          <p className="m-1 text-stone-900 dark:text-stone-300">{`AVAX ${(
            multiplier * betAmount
          )
            .toFixed(6)
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</p>
        </div>
      </div>
    </div>
  )
}
