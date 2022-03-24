import { BsPiggyBank } from "react-icons/bs"

interface Props {
    bets?: string[]
}

export const NetProfit: React.FC<Props> = ({
  bets,
}) => {
  return (
    <div className="flex justify-evenly"><BsPiggyBank /> {bets}</div>
  )
}
