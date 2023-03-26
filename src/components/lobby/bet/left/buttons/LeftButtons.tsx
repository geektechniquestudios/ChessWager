import { Bet } from "../../../../../interfaces/Bet"
import { User1PayButton } from "./User1PayButton"

interface Props {
  bet: Bet
  isSelected: boolean
}

export const LeftButtons: React.FC<Props> = ({ bet, isSelected }) => {
  return (
    <div className="absolute bottom-0 left-0 flex w-full items-center justify-start">
      {isSelected && <User1PayButton bet={bet} />}
    </div>
  )
}
