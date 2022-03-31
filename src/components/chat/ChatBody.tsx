import { useCollectionData } from "react-firebase-hooks/firestore"
import { ChatMessage } from "./ChatMessage"
import "../../style/scrollbar.scss"
import {
  CollectionReference,
  DocumentData,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import { User } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import type { Message } from "../../interfaces/Message"

interface Props {
  messagesRef: CollectionReference<DocumentData>
}

export const ChatBody: React.FC<Props> = ({ messagesRef }) => {
  const q = query(messagesRef, orderBy("createdAt", "desc"), limit(25))
  const [messages]: [
    Message[] | any | undefined,
    boolean,
    FirebaseError | undefined,
  ] = useCollectionData(q, { idField: "id" })

  return (
    <div className="scrollbar flex flex-col-reverse pb-3 overflow-y-auto overflow-x-hidden px-1">
      {messages
        ?.sort(
          (a: Message, b: Message) =>
            b.createdAt?.seconds - a.createdAt?.seconds,
        )
        .map((message: Message) => (
          <ChatMessage key={message.uid + message?.createdAt} {...message} />
        ))}
    </div>
  )
}
