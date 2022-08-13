import { UserDataState } from "../../../../../containers/UserDataState"
import { DropdownButton } from "./DropdownButton"

interface Props {
  id: string
  displayName: string
}

export const BanUserButton: React.FC<Props> = ({ id, displayName }) => {
  const { userData } = UserDataState.useContainer()
  return (
    <>
      {(userData?.moderatorLevel ?? 0) > 0 && id !== userData?.id && (
        <DropdownButton
          content={<div className="px-0.5 text-xs">Ban User</div>}
          onClick={() => {
            alert(`${displayName} has been banned.`)
            //@todo ban user withd db
          }}
          title="Ban User"
          className="text-red-700 hover:border-red-700 hover:text-red-700 dark:text-red-400 dark:hover:border-red-400 dark:hover:text-red-500"
        />
      )}
    </>
  )
}
