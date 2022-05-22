import { MessageBody } from "./MessageBody"
import { UserTitle } from "./UserTitle"

interface Props {
  text: string
  uid: string
  photoURL: string
  userName: string
}

export const ChatMessage: React.FC<Props> = ({
  text,
  uid,
  photoURL,
  userName,
}) => {
  return (
    <div className="color-shift color-shift w-full gap-1.5 rounded-md p-2 hover:bg-stone-300 dark:hover:bg-black">
      <UserTitle photoURL={photoURL} userName={userName} uid={uid} />
      <MessageBody text={text} />
    </div>
  )
}
