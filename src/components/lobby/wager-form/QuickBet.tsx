import { Button } from "@mui/material"
import { Price } from "../../containers/Price"

interface Props {
  setBetAmount: React.Dispatch<React.SetStateAction<number>>
  setLocalAvaxAmount: React.Dispatch<React.SetStateAction<string>>
  setLocalUsdAmount: React.Dispatch<React.SetStateAction<string>>
  setIsAmountEmpty: React.Dispatch<React.SetStateAction<boolean>>
}

export const QuickBet: React.FC<Props> = ({
  setBetAmount,
  setLocalUsdAmount,
  setLocalAvaxAmount,
  setIsAmountEmpty,
}) => {
  const { avaxPrice } = Price.useContainer()

  const updateBetValues = (usdAmount: number) => {
    setBetAmount(usdAmount / avaxPrice)
    setLocalAvaxAmount((usdAmount / avaxPrice).toFixed(6).toString())
    setLocalUsdAmount(usdAmount.toFixed(2).toString())
    setIsAmountEmpty(false)
  }
  return (
    <div className="color-shift grid w-full grid-cols-3 grid-rows-2 rounded-md border border-stone-400 bg-stone-300 dark:border-stone-500 dark:bg-stone-700">
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(20)
        }}
      >
        <p className="font-bold">$20</p>
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(50)
        }}
      >
        <p className="font-bold">$50</p>
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(100)
        }}
      >
        <p className="font-bold">$100</p>
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(500)
        }}
      >
        <p className="font-bold">$500</p>
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(1000)
        }}
      >
        <p className="font-bold">$1k</p>
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(5000)
        }}
      >
        <p className="font-bold">$5k</p>
      </Button>
    </div>
  )
}
