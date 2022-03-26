import { useCollectionData } from "react-firebase-hooks/firestore"
import firebase from "firebase/compat/app"
import { ChatMessage } from "./ChatMessage"
import "../../style/scrollbar.scss"

interface Props {
  messagesRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
}

export const ChatBody: React.FC<Props> = ({ messagesRef }) => {
  const query = messagesRef.orderBy("createdAt", "desc").limit(25)
  const [messages] = useCollectionData(query, { idField: "id" })

  return (
    <div className="scrollbar flex flex-col-reverse pb-3 overflow-y-auto overflow-x-hidden px-1">
      {messages?.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </div>
  )
}
