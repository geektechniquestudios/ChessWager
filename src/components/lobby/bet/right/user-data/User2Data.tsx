import { Bet } from "../../../../../interfaces/Bet"
import { LeaveButton } from "../buttons/LeaveButton"
import { RightButtons } from "../buttons/RightButtons"
import { User2Image } from "./User2Image"

interface Props {
  bet: Bet
  isSelected: boolean
  isJoining: boolean
  setIsJoining: React.Dispatch<React.SetStateAction<boolean>>
}

export const User2Data: React.FC<Props> = ({
  bet,
  isSelected,
  isJoining,
  setIsJoining,
}) => {
  return (
    <div className="relative flex w-2/5 items-center justify-start">
      <User2Image bet={bet} isSelected={isSelected} />
      <RightButtons
        bet={bet}
        isSelected={isSelected}
        isJoining={isJoining}
        setIsJoining={setIsJoining}
      />
      <LeaveButton bet={bet} />
    </div>
  )
}
