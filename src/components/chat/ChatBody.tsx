import "../../style/scrollbar.scss"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { ChatMessage } from "./ChatMessage"
import {
  CollectionReference,
  DocumentData,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import type { Message } from "../../interfaces/Message"

interface Props {
  messagesRef: CollectionReference<DocumentData>
}

export const ChatBody: React.FC<Props> = ({ messagesRef }) => {
  const q = query(messagesRef, orderBy("createdAt", "desc"), limit(100))
  const [messages] = useCollectionData<Message[] | any>(q)

  return (
    <div className="scrollbar flex flex-col-reverse pb-3 overflow-y-auto overflow-x-hidden px-1">
      {messages
        ?.sort(
          (a: Message, b: Message) =>
            b.createdAt?.seconds - a.createdAt?.seconds,
        )
        .map((message: Message, index: number) => (
          <ChatMessage
            key={message.uid + message?.createdAt + index}
            {...message}
          />
        ))}
    </div>
  )
}
