import { Auth } from "../../../../containers/Auth"
import { ApproveButton } from "./ApproveButton"
import { KickButton } from "./KickButton"

interface Props {
  user1Id: string
  user2Id: string
  status: string
  id: string
}

export const ApproveKickWrapper: React.FC<Props> = ({
  user1Id,
  status,
  id,
  user2Id,
}) => {
  const { auth, user } = Auth.useContainer()

  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && (
          <div className="flex h-full items-center justify-evenly gap-2 border-t border-stone-400 px-2 dark:border-stone-600 lg:border-r">
            <ApproveButton betId={id} user1Id={user1Id} user2Id={user2Id} />
            <KickButton betId={id} />
          </div>
        )}
    </>
  )
}
