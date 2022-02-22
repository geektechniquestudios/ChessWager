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
  const { text, photoURL, userName } = message

  return (
    <div className="w-full hover:bg-stone-300 dark:hover:bg-black color-shift gap-1.5 p-2 rounded-md color-shift">
      <UserTitle photoURL={photoURL} userName={userName} />
      <MessageBody text={text} />
    </div>
  )
}
