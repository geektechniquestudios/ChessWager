import { Price } from "../../containers/Price"

interface Props {
  setBetAmount: React.Dispatch<React.SetStateAction<number>>
  setLocalAvaxAmount: React.Dispatch<React.SetStateAction<string>>
  setLocalUsdAmount: React.Dispatch<React.SetStateAction<string>>
}

export const QuickBet: React.FC<Props> = ({
  setBetAmount,
  setLocalUsdAmount,
  setLocalAvaxAmount,
}) => {
  const { avaxPrice } = Price.useContainer()

  const updateBetValues = (usdAmount: number) => {
    setBetAmount(usdAmount / avaxPrice)
    setLocalAvaxAmount((usdAmount / avaxPrice).toFixed(6).toString())
    setLocalUsdAmount(usdAmount.toFixed(2).toString())
  }
  return (
    <div className="grid grid-cols-3 grid-rows-2 w-full border-2">
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          updateBetValues(20)
        }}
      >
        $20
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          updateBetValues(50)
        }}
      >
        $50
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          updateBetValues(100)
        }}
      >
        $100
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          updateBetValues(500)
        }}
      >
        $500
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          updateBetValues(1000)
        }}
      >
        $1k
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          updateBetValues(5000)
        }}
      >
        $5k
      </button>
    </div>
  )
}
