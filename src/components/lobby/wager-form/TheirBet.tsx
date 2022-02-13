import { Price } from "../../containers/Price"

interface Props {
  multiplier: number
  betAmount: number
}

export const TheirBet: React.FC<Props> = ({ multiplier, betAmount }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex border-1 px-1 border-stone-900 dark:border-stone-500">
      <label className="grid place-content-center m-2 text-stone-900 dark:text-stone-300">
        Their Bet
      </label>
      <div className="border-1 m-2 border-stone-900 dark:border-stone-500" />
      <div className="w-full">
        <div className="flex justify-center my-1">
          <p
            style={{ textDecoration: "underline solid #134e4a 2px" }}
            className="m-1 text-stone-900 dark:text-stone-300"
          >{`USD ${(multiplier * betAmount * avaxPrice)
            .toFixed(2)
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</p>
        </div>
        <div className="flex justify-center my-1">
          <p
            style={{ textDecoration: "underline solid #9f1239 2px" }}
            className="m-1 text-stone-900 dark:text-stone-300"
          >{`AVAX ${(multiplier * betAmount)
            .toFixed(6)
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</p>
        </div>
      </div>
    </div>
  )
}
