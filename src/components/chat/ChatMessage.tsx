import { Auth } from "../containers/Auth"
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
  const { auth } = Auth.useContainer()
  const { text, uid, photoURL, userName } = message

  const userMessage = uid === auth.currentUser?.uid ? "" : ""

  return (
    <div
      className={`${userMessage} w-full hover:bg-stone-500 color-shift gap-1.5 p-2 rounded-md color-shift inline`}
    >
      <UserTitle photoURL={photoURL} userName={userName} />
      <p className="message-text text-stone-900 dark:text-stone-300 text-sm">{text}</p>
    </div>
  )
}
