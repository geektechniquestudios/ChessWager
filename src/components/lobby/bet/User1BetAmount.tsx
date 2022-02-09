import { Price } from "../../containers/Price"

interface Props {
  amount: number
  multiplier: number
  
}

export const User1BetAmount: React.FC<Props> = ({ amount, multiplier }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div>
      <div>{`$${(amount * avaxPrice).toFixed(2)}`}</div>
      <div className="flex justify-end">
        <p className="grid place-content-center border-1 rounded-full px-0.5 text-xs">
          x{parseFloat(multiplier.toString())}
        </p>
      </div>
    </div>
  )
}
