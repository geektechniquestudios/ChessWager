import { Price } from "../../../containers/Price"

interface Props {
  potSize: string
}

export const PotSize: React.FC<Props> = ({ potSize }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className=" z-10 underline decoration-4 font-bold top-1 text-stone-900 dark:text-stone-300">
      <p className="px-1">{`$${(Number(potSize) * avaxPrice)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
    </div>
  )
}
