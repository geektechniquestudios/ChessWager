import { Price } from "../../../../containers/Price"

interface Props {
  amount: number
  multiplier: number
}

export const User2BetAmount: React.FC<Props> = ({ amount, multiplier }) => {
  const { avaxPrice } = Price.useContainer()

  return (
    <div className="flex flex-col justify-center p-0.5">
      <div>{`$${(amount * multiplier * avaxPrice)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
      <div className="flex justify-start">
        <p className="grid place-content-center px-0.5 text-xs font-bold">
          x{parseFloat((1 / multiplier).toFixed(2))}
        </p>
      </div>
    </div>
  )
}
