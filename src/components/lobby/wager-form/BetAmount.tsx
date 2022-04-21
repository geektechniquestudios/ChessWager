import CurrencyInput from "react-currency-input-field"
import { Price } from "../../containers/Price"
import { useState } from "react"

interface Props {
  betAmount: number
  setBetAmount: React.Dispatch<React.SetStateAction<number>>
  localAvaxAmount: string
  setLocalAvaxAmount: React.Dispatch<React.SetStateAction<string>>
  localUsdAmount: string
  setLocalUsdAmount: React.Dispatch<React.SetStateAction<string>>
  isAmountEmpty: boolean
  setIsAmountEmpty: React.Dispatch<React.SetStateAction<boolean>>
}

export const BetAmount: React.FC<Props> = ({
  betAmount,
  setBetAmount,
  localAvaxAmount,
  setLocalAvaxAmount,
  localUsdAmount,
  setLocalUsdAmount,
  isAmountEmpty,
  setIsAmountEmpty,
}) => {
  const { avaxPrice } = Price.useContainer()
  const borderWarning = isAmountEmpty
    ? " border-red-600"
    : "border-stone-400 dark:border-stone-500 "
  const [isUsdFocused, setIsUsdFocused] = useState(false)

  return (
    <div
      className={`border flex px-1 color-shift bg-stone-300 dark:bg-stone-700 ${borderWarning}`}
    >
      <p className="grid place-content-center m-2 text-stone-900 dark:text-stone-300 font-bold">
        Your Bet
      </p>
      <div className="border m-2 border-stone-900 dark:border-stone-500" />
      <div>
        <div className="flex justify-between my-1">
          <div className="flex justify-center flex-col font-bold m-1 text-stone-900 dark:text-stone-300 text-xs">
            USD
          </div>
          <CurrencyInput
            className="ml-1 p-1 rounded-sm bg-stone-100 dark:bg-stone-800 dark:text-stone-300 text-stone-900"
            autoComplete="off"
            placeholder="Choose your bet"
            defaultValue=""
            value={
              isUsdFocused
                ? localUsdAmount
                : betAmount * avaxPrice === 0
                ? ""
                : (betAmount * avaxPrice).toFixed(2)
            }
            onValueChange={(value) => {
              setLocalUsdAmount(value!)
            }}
            allowNegativeValue={false}
            onBlur={(e) => {
              const newValue = Number(e.target.value.replace(/,/g, "") ?? 0)
              setBetAmount(newValue / avaxPrice)
              setLocalAvaxAmount((newValue / avaxPrice).toFixed(6).toString())
              setIsUsdFocused(false)
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && e.currentTarget.blur()
            }}
            onFocus={() => {
              setIsAmountEmpty(false)
              setIsUsdFocused(true)
            }}
          />
        </div>
        <div className="flex justify-between my-1">
          <div className="flex justify-center flex-col font-bold m-1 text-stone-900 dark:text-stone-300 text-xs">
            AVAX
          </div>
          <CurrencyInput
            className="ml-1 p-1 rounded-sm bg-stone-100 dark:bg-stone-800 dark:text-stone-300"
            autoComplete="off"
            placeholder="Choose your bet"
            defaultValue=""
            decimalsLimit={6}
            value={localAvaxAmount}
            onValueChange={(value) => {
              setLocalAvaxAmount(Number(value!) === 0 ? "" : value!)
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
            onFocus={() => {
              setIsAmountEmpty(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}
