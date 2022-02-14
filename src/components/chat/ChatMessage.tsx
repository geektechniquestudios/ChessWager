import { Auth } from "../containers/Auth"
import { MessageBody } from "./MessageBody"
import { UserTitle } from "./UserTitle"

interface Props {
  message: {
    text: string
    uid: string
    photoURL: string
    userName: string
  }
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const { text, uid, photoURL, userName } = message

  const { auth } = Auth.useContainer()
  const userMessage = uid === auth.currentUser?.uid ? "" : ""

  return (
    <div
      className={`${userMessage} w-full hover:bg-stone-300 dark:hover:bg-black color-shift gap-1.5 p-2 rounded-md color-shift`}
    >
      <UserTitle photoURL={photoURL} userName={userName} />
      <MessageBody text={text} />
    </div>
  )
}
