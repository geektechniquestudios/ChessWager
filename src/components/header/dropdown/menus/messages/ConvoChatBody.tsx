import {
  CollectionReference,
  DocumentData,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import type { Message } from "../../../../../interfaces/Message"
import { ConvoChatMessage } from "./ConvoChatMessage"

interface Props {
  messagesRef: CollectionReference<DocumentData>
}
export const ConvoChatBody: React.FC<Props> = ({ messagesRef }) => {
  const q = query(messagesRef, orderBy("createdAt", "desc"), limit(25))

  const [messages] = useCollectionData<[Message[]] | any>(q, { idField: "id" })
  return (
    <div className="scrollbar flex flex-col-reverse pb-3 overflow-y-auto overflow-x-hidden px-1">
      {messages?.map((message: Message) => (
        <ConvoChatMessage key={message.uid + message.createdAt} {...message} />
      ))}
    </div>
  )
}
