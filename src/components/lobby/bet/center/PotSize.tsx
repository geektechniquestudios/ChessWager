import { Price } from "../../../containers/Price"

interface Props {
  potSize: string
}

export const PotSize: React.FC<Props> = ({ potSize }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="grid place-content-center font-bold text-stone-900 dark:text-stone-300">
      <p className="px-1">{`$${(Number(potSize) * avaxPrice)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
    </div>
  )
}
