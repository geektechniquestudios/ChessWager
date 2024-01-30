import { PriceState } from "../../../../containers/PriceState"

interface Props {
  potSize: string
}

export const PotSize: React.FC<Props> = ({ potSize }) => {
  const { avaxPrice } = PriceState.useContainer()
  return (
    <div className="grid place-content-center text-xs font-bold text-stone-900 dark:text-stone-300 md:text-sm">
      <p className="px-1">{`$${(Number(potSize) * avaxPrice)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
    </div>
  )
}
