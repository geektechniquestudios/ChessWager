import { MessageBody } from "../../../../chat/MessageBody"
import { ConvoUserTitle } from "./ConvoUserTitle"

interface Props {
  text: string
  uid: string
  photoURL: string
  userName: string
}

export const ConvoChatMessage: React.FC<Props> = ({
  text,
  uid,
  photoURL,
  userName,
}) => {
  return (
    <div className="w-full hover:bg-stone-300 dark:hover:bg-black color-shift gap-1.5 p-2 rounded-md color-shift">
      <ConvoUserTitle photoURL={photoURL} userName={userName} uid={uid} />
      <MessageBody text={text} />
    </div>
  )
}
