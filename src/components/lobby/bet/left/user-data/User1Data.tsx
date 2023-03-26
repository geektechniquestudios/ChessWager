import { LeftButtons } from "../buttons/LeftButtons"
import { Bet } from "../../../../../interfaces/Bet"
import { DeleteBetButton } from "../buttons/DeleteBetButton"
import { User1Image } from "./User1Image"

interface Props {
  bet: Bet
  isSelected: boolean
}

export const User1Data: React.FC<Props> = ({ bet, isSelected }) => {
  return (
    <div className="relative flex w-2/5 items-center justify-end">
      <DeleteBetButton bet={bet} isSelected={isSelected} />
      <LeftButtons bet={bet} isSelected={isSelected} />
      <User1Image bet={bet} />
    </div>
  )
}
