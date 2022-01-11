import { Price } from "../../containers/Price"

interface Props {
  amount: number
  multiplier: number
}

export const User2BetAmount: React.FC<Props> = ({ amount, multiplier }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="mx-1">
      <div>{`$${(amount * multiplier * avaxPrice).toFixed(2)}`}</div>
      <p className="text-xs flex justify-start transform -translate-y-2 ">
        x{parseFloat((1 / multiplier).toFixed(2))}
      </p>
    </div>
  )
}
