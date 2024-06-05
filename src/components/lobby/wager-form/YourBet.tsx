import CurrencyInput from "react-currency-input-field"
import { PriceState } from "../../../containers/PriceState"
import { useState, Dispatch, SetStateAction } from "react"

interface Props {
  betAmount: number
  setBetAmount: Dispatch<SetStateAction<number>>
  localAvaxAmount: string
  setLocalAvaxAmount: Dispatch<SetStateAction<string>>
  localUsdAmount: string
  setLocalUsdAmount: Dispatch<SetStateAction<string>>
  isAmountEmpty: boolean
  setIsAmountEmpty: Dispatch<SetStateAction<boolean>>
}

export const YourBet: React.FC<Props> = ({
  betAmount,
  setBetAmount,
  localAvaxAmount,
  setLocalAvaxAmount,
  localUsdAmount,
  setLocalUsdAmount,
  isAmountEmpty,
  setIsAmountEmpty,
}) => {
  const { avaxPrice } = PriceState.useContainer()
  const borderWarning = isAmountEmpty ? "!border-red-600" : ""
  const [isUsdFocused, setIsUsdFocused] = useState(false)

  return (
    <div
      id="bet-amount"
      className={`${borderWarning} wager-form-tile flex px-1`}
    >
      <p className="m-2 grid place-content-center font-bold text-stone-900 dark:text-stone-300">
        Your Bet
      </p>
      <div className="m-2 border border-stone-900 dark:border-stone-500" />
      <div className="w-full">
        <div className="my-1 flex justify-center">
          <div className="m-1 flex w-8 items-center justify-end text-xs font-bold text-stone-900 dark:text-stone-300">
            USD
          </div>

          <CurrencyInput
            className="ml-1 w-28 grow rounded-md bg-white p-1 text-stone-900 dark:bg-stone-800 dark:text-stone-300"
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
              const num = Number(e.target.value.replace(/,/g, ""))
              const newValue = isNaN(num) ? 0 : num
              setBetAmount(newValue / avaxPrice)
              setLocalAvaxAmount((newValue / avaxPrice).toFixed(6).toString())
              setIsUsdFocused(false)
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && e.currentTarget.blur()
            }}
            onFocus={() => {
              setIsAmountEmpty(false)
              setIsUsdFocused(true)
            }}
          />
        </div>
        <div className="my-1 flex justify-center">
          <div className="m-1 flex w-8 items-center justify-end text-xs font-bold text-stone-900 dark:text-stone-300">
            AVAX
          </div>
          <CurrencyInput
            className="ml-1 w-28 grow rounded-md bg-white p-1 text-stone-900 dark:bg-stone-800 dark:text-stone-300"
            autoComplete="off"
            placeholder="Choose your bet"
            defaultValue=""
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
            onKeyDown={(e) => {
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
