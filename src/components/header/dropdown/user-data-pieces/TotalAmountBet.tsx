import { GiPayMoney } from "react-icons/gi"

interface Props {
  bets?: string[]
}

export const TotalAmountBet: React.FC<Props> = ({ bets }) => {
  return (
    <div
      data-bs-toggle="tooltip"
      title="Total Amount Bet"
      className="flex justify-evenly"
    >
      <GiPayMoney /> {bets}
    </div>
  )
}
