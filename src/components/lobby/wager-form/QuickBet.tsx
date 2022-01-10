import { Price } from "../../containers/Price"
import Button from "@mui/material/Button"

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
    <div className="grid grid-cols-3 grid-rows-2 w-full border-1">
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(20)
        }}
      >
        $20
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(50)
        }}
      >
        $50
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(100)
        }}
      >
        $100
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(500)
        }}
      >
        $500
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(1000)
        }}
      >
        $1k
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={() => {
          updateBetValues(5000)
        }}
      >
        $5k
      </Button>
    </div>
  )
}
