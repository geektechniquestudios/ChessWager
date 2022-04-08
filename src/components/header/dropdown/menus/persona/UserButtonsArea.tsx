import { Auth } from "../../../../containers/Auth"
import { AddFriendButton } from "./buttons/AddFriendButton"
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
            id={id ?? "...Loading"}
            displayName={displayName}
            photoURL={photoURL}
            activeMenu={activeMenu}
          />
          <BlockUserButton id={id ?? "...Loading"} />
          <ReportUserButton id={id ?? "...Loading"} />
          <AddFriendButton id={id ?? "...Loading"} />
        </div>
      )}
    </>
  )
}
