import { Price } from "../../containers/Price"

interface Props {
  multiplier: number
  betAmount: number
}

export const TheirBet: React.FC<Props> = ({ multiplier, betAmount }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex border-1 px-1">
      <label className="grid place-content-center m-2">Their Bet</label>
      <div className="border-1 m-2" />
      <div>
        <div className="flex justify-start my-1">
          <span className="m-1">AVAX</span>
          <span className="m-1">{(multiplier * betAmount).toFixed(6)}</span>
        </div>
        <div className="flex justify-start my-1">
          <span className="m-1">USD</span>
          <span className="m-1">{(multiplier * betAmount * avaxPrice).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
