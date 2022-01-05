import { Price } from "../../containers/Price"

interface Props {
  setBetAmount: React.Dispatch<React.SetStateAction<number>>
}

export const QuickBet: React.FC<Props> = ({ setBetAmount }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="grid grid-cols-3 grid-rows-2 w-full border-2">
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          setBetAmount(20 / avaxPrice)
        }}
      >
        $20
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          setBetAmount(50 / avaxPrice)
        }}
      >
        $50
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          setBetAmount(100 / avaxPrice)
        }}
      >
        $100
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          setBetAmount(500 / avaxPrice)
        }}
      >
        $500
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          setBetAmount(1000 / avaxPrice)
        }}
      >
        $1k
      </button>
      <button
        type="button"
        className="border m-1 rounded-sm p-1"
        onClick={() => {
          setBetAmount(5000 / avaxPrice)
        }}
      >
        $5k
      </button>
    </div>
  )
}
