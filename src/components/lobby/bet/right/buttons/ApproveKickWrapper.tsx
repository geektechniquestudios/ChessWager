import { AnimatePresence, LayoutGroup } from "framer-motion"
import { Bet } from "../../../../../interfaces/Bet"
import { Auth } from "../../../../containers/Auth"
import { ApproveButton } from "./ApproveButton"
import { KickButton } from "./KickButton"

interface Props {
  bet: Bet
}

export const ApproveKickWrapper: React.FC<Props> = ({ bet }) => {
  const { user } = Auth.useContainer()
  const { user1Id, status, id } = bet

  return (
    <AnimatePresence>
      {user && user1Id === user.uid && status === "pending" && (
        <div className="absolute bottom-0.5 right-0.5 flex flex-col items-end justify-evenly gap-0.5">
          <LayoutGroup>
            <KickButton id={id} bet={bet} />
            <ApproveButton bet={bet} />
          </LayoutGroup>
        </div>
      )}
    </AnimatePresence>
  )
}
