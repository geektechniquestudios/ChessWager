import "../../style/scrollbar.scss"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { ChatMessage } from "./ChatMessage"
import {
  CollectionReference,
  DocumentData,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore"
import type { Message } from "../../interfaces/Message"
import { useState } from "react"
import { UserDataState } from "../containers/UserDataState"

interface Props {
  messagesRef: CollectionReference<DocumentData>
}

export const ChatBody: React.FC<Props> = ({ messagesRef }) => {
  const [timestamp] = useState<Timestamp>(Timestamp.now())
  const { userData } = UserDataState.useContainer()
  const q = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    where("createdAt", ">", timestamp),
  )
  const [messages] = useCollectionData<Message[] | any>(q)
  return (
    <div className="scrollbar flex flex-col-reverse pb-3 overflow-y-auto overflow-x-hidden px-1">
      {messages
        ?.filter((message) => !userData.blockedUsers.includes(message.uid))
        .sort(
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
