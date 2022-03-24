import { BsPiggyBank } from "react-icons/bs"

interface Props {
    bets?: string[]
}

export const NetProfit: React.FC<Props> = ({
  bets,
}) => {
  return (
    <div data-bs-toggle="tooltip" title="Net Profit" className="flex justify-evenly"><BsPiggyBank /> {bets}</div>
  )
}
