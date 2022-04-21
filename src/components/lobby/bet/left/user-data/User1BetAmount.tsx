import { Price } from "../../../../containers/Price"

interface Props {
  amount: number
  multiplier: number
}

export const User1BetAmount: React.FC<Props> = ({ amount, multiplier }) => {
  const { avaxPrice } = Price.useContainer()

  return (
    <div className="pb-0.5">
      <div>{`$${(amount * avaxPrice)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
      <div className="flex justify-end">
        <p className="grid place-content-center border rounded-full px-0.5 text-xs font-bold">
          x{parseFloat(multiplier.toString())}
        </p>
      </div>
    </div>
  )
}
