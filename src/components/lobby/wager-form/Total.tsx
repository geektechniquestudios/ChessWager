import { PriceState } from "../../../containers/PriceState"

interface Props {
  betAmount: number
  multiplier: number
}

export const Total: React.FC<Props> = ({ betAmount, multiplier }) => {
  const { avaxPrice } = PriceState.useContainer()
  const avaxTotal = betAmount * multiplier + betAmount
  const usdTotal = avaxPrice * avaxTotal

  const formatUsd = (num: number) => {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  const formatAvax = (num: number) => {
    const decimalsToShow = num > 1 ? 2 : 4
    return num.toFixed(decimalsToShow).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  return (
    <div className="color-shift flex rounded-md border border-stone-400 bg-stone-200 dark:border-stone-500 dark:bg-stone-700">
      <p className=" m-2 grid place-content-center border-r-2 border-stone-900 pr-2 font-bold text-stone-900 dark:border-stone-500 dark:text-stone-300">
        Pot
      </p>
      <div className="p-1.5">
        <div className="my-1 flex justify-between">
          <div className="flex w-full justify-end">
            <p className="mr-1 text-stone-900 dark:text-stone-300">
              {formatUsd(usdTotal)}
            </p>
            <p className="font-bold text-stone-900 dark:text-stone-300">USD</p>
          </div>
        </div>
        <div className="my-1 flex justify-between">
          <div className="flex w-full justify-end">
            <p className="mr-1 text-stone-900 dark:text-stone-300">
              {formatAvax(avaxTotal)}
            </p>
            <p className="font-bold text-stone-900 dark:text-stone-300">AVAX</p>
          </div>
        </div>
      </div>
    </div>
  )
}
