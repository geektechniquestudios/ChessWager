import { Auth } from "../../../../containers/Auth"
import { StartFollowingButton } from "./buttons/StartFollowingButton"
import { BlockUserButton } from "./buttons/BlockUserButton"
import { ReportUserButton } from "./buttons/ReportUserButton"
import { SendMessageButton } from "./buttons/SendMessageButton"

interface Props {
  id: string
  displayName: string
  photoURL: string
  activeMenu: string
}

export const UserButtonsArea: React.FC<Props> = ({
  id,
  displayName,
  photoURL,
  activeMenu,
}) => {
  const { auth } = Auth.useContainer()
  const isUser = auth.currentUser?.uid === id
  return (
    <>
      {!isUser && displayName !== "" && (
        <div className="h-22 my-1 flex w-full justify-evenly">
          <SendMessageButton
            id={id ?? ""}
            displayName={displayName}
            photoURL={photoURL}
            activeMenu={activeMenu}
          />
          <StartFollowingButton id={id ?? ""} />
          <BlockUserButton id={id ?? ""} />
          <ReportUserButton id={id ?? ""} activeMenu={activeMenu} />
        </div>
      )}
    </>
  )
}
