import CurrencyInput from "react-currency-input-field"
import { Price } from "../../containers/Price"

interface Props {
  betAmount: number
  setBetAmount: React.Dispatch<React.SetStateAction<number>>
}

export const BetAmount: React.FC<Props> = ({ betAmount, setBetAmount }) => {
  const { avaxPrice } = Price.useContainer() 
  return (
    <div className="flex border-2">
      <label className="grid place-content-center m-2">Your Bet</label>
      <div className="border-1 m-2" />
      <div>
        <div className="flex justify-between my-1">
          <span className="m-1">USD</span>
          <CurrencyInput
            className="p-1"
            autoComplete="off"
            value={(betAmount * avaxPrice).toFixed(2)}
            onValueChange={(value) => {
              setBetAmount(Number(value) / avaxPrice)
            }}
            // decimalsLimit={2}
            placeholder="Chooes your bet"
            fixedDecimalLength={2}
            allowNegativeValue={false}
          />
        </div>
        <div className="flex justify-between my-1">
          <span className="m-1">AVAX</span>
          <CurrencyInput
            className="p-1"
            autoComplete="off"
            name="amount"
            placeholder="Chooes your bet"
            defaultValue={0.01} //@todo display usd equivalent here
            decimalsLimit={6}
            value={betAmount.toFixed(4)}
            // onValueChange={(value) => setBetAmount(Number(value ?? 0))}
            allowNegativeValue={false}
            onBlur={(e) => {
              setBetAmount(Number(e.target.value ?? 0))
            }}
            // suffix="Ξ"
          />
        </div>
      </div>
    </div>
  )
}
