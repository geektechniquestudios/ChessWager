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
    <div className="w-full gap-1.5 px-2 py-1">
      <ConvoUserTitle photoURL={photoURL} userName={userName} uid={uid} />
      <MessageBody text={text} />
    </div>
  )
}
