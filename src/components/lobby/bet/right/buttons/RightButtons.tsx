import { Bet } from "../../../../../interfaces/Bet"
import { AuthState } from "../../../../../containers/AuthState"
import { ApproveKickWrapper } from "./ApproveKickWrapper"
import { JoinButton } from "./JoinButton"
import { User2PayButton } from "./User2PayButton"

interface Props {
  bet: Bet
  isSelected: boolean
  isJoining: boolean
  setIsJoining: React.Dispatch<React.SetStateAction<boolean>>
}

export const RightButtons: React.FC<Props> = ({
  bet,
  isSelected,
  isJoining,
  setIsJoining,
}) => {
  const { user } = AuthState.useContainer()
  return (
    <>
      {user && (
        <div className="absolute bottom-0 right-0 flex w-full items-center justify-end">
          <JoinButton
            isJoining={isJoining}
            setIsJoining={setIsJoining}
            bet={bet}
            isSelected={isSelected}
          />
          <User2PayButton bet={bet} />
          <ApproveKickWrapper bet={bet} />
        </div>
      )}
    </>
  )
}
