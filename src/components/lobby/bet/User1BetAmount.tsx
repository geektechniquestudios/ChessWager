import { Price } from "../../containers/Price"

interface Props {
  amount: number
  multiplier: number
}

export const User1BetAmount: React.FC<Props> = ({ amount, multiplier }) => {
  const { avaxPrice } = Price.useContainer()

  const addCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div>
      <div>{`$${(amount * avaxPrice)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
      <div className="flex justify-end">
        <p className="grid place-content-center border-1 rounded-full px-0.5 text-xs font-bold">
          x{parseFloat(multiplier.toString())}
        </p>
      </div>
    </div>
  )
}
