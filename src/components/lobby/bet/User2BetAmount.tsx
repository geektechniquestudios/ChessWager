import { Price } from "../../containers/Price"

interface Props {
  amount: number
  multiplier: number
}

export const User2BetAmount: React.FC<Props> = ({ amount, multiplier }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div>
      <div>{`$${(amount * multiplier * avaxPrice).toFixed(2)}`}</div>
      <div className="flex justify-start">
        <p className="grid place-content-center border-1 rounded-full px-0.5 text-xs">
          x{parseFloat((1 / multiplier).toFixed(2))}
        </p>
      </div>
    </div>
  )
}
