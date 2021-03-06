import "../../style/scrollbar.scss"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { ChatMessage } from "./ChatMessage"
import {
  CollectionReference,
  DocumentData,
  orderBy,
  Query,
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
  ) as Query<Message>
  const [messages] = useCollectionData<Message>(q)
  return (
    <div
      className="scrollbar flex flex-col-reverse overflow-y-auto overflow-x-hidden px-1 pb-3"
      id="global-chat-body"
    >
      {messages
        ?.filter((message) => {
          if (userData) return !userData.blockedUsers.includes(message.uid)
          return true
        })
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
