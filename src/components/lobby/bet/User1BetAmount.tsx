import { Price } from "../../containers/Price"

interface Props {
  amount: number
  multiplier: number
}

export const User1BetAmount: React.FC<Props> = ({ amount, multiplier }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="mx-1">
      <div>{`$${(amount * avaxPrice).toFixed(2)}`}</div>
      <p className="text-xs flex justify-end transform -translate-y-2 ">
        x{parseFloat(multiplier.toString())}
      </p>
    </div>
  )
}
