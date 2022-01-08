import CurrencyInput from "react-currency-input-field"
import { Price } from "../../containers/Price"

interface Props {
  setBetAmount: React.Dispatch<React.SetStateAction<number>>
  localAvaxAmount: string
  setLocalAvaxAmount: React.Dispatch<React.SetStateAction<string>>
  localUsdAmount: string
  setLocalUsdAmount: React.Dispatch<React.SetStateAction<string>>
}

export const BetAmount: React.FC<Props> = ({
  setBetAmount,
  localAvaxAmount,
  setLocalAvaxAmount,
  localUsdAmount,
  setLocalUsdAmount,
}) => {
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
            placeholder="Chooes your bet"
            defaultValue={""}
            value={localUsdAmount}
            onValueChange={(value) => {
              setLocalUsdAmount(value!)
            }}
            allowNegativeValue={false}
            onBlur={(e) => {
              const newValue = Number(e.target.value.replace(/,/g, "") ?? 0)
              setBetAmount(newValue / avaxPrice)
              setLocalAvaxAmount((newValue / avaxPrice).toFixed(6).toString())
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && e.currentTarget.blur()
            }}
          />
        </div>
        <div className="flex justify-between my-1">
          <span className="m-1">AVAX</span>
          <CurrencyInput
            className="p-1"
            autoComplete="off"
            placeholder="Chooes your bet"
            defaultValue={""}
            decimalsLimit={6}
            value={localAvaxAmount}
            onValueChange={(value) => {
              setLocalAvaxAmount(value!)
            }}
            allowNegativeValue={false}
            onBlur={(e) => {
              const newValue = Number(e.target.value.replace(/,/g, "") ?? 0)
              setBetAmount(newValue)
              setLocalUsdAmount((newValue * avaxPrice).toFixed(2).toString())
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && e.currentTarget.blur()
            }}
          />
        </div>
      </div>
    </div>
  )
}
