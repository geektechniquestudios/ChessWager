import { Price } from "../../containers/Price"

interface Props {
  betAmount: number
  multiplier: number
}

export const Total: React.FC<Props> = ({ betAmount, multiplier }) => {
  const { avaxPrice } = Price.useContainer()
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
    <div className="border flex border-stone-400 dark:border-stone-500 dark:bg-stone-700 bg-stone-300 color-shift rounded-md">
      <p className="grid place-content-center m-2 border-r-2 pr-2 border-stone-900 dark:border-stone-500 text-stone-900 dark:text-stone-300 font-bold">
        Pot Size
      </p>
      <div className="p-1.5">
        <div className="flex justify-between my-1">
          <div className="flex justify-end w-full">
            <p className="mr-1 text-stone-900 dark:text-stone-300">
              {formatUsd(usdTotal)}
            </p>
            <p className="font-bold text-stone-900 dark:text-stone-300">USD</p>
          </div>
        </div>
        <div className="flex justify-between my-1">
          <div className="flex justify-end w-full">
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
