import { Auth } from "../../containers/Auth"
import { ApproveButton } from "./ApproveButton"
import { KickButton } from "./KickButton"

interface Props {
  user1Id: string
  status: string
  id: string
}

export const ApproveKickWrapper: React.FC<Props> = ({
  user1Id,
  status,
  id,
}) => {
  const { auth, user } = Auth.useContainer()

  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && (
          <div className="flex justify-between border-l gap-2 px-2 border-stone-400 dark:border-stone-700">
            <ApproveButton betId={id} />
            <KickButton betId={id} />
          </div>
        )}
    </>
  )
}
