import { useCollectionData } from "react-firebase-hooks/firestore"
import firebase from "firebase/compat/app"
import { ChatMessage } from "./ChatMessage"

interface Props {
  messagesRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
}

export const ChatBody: React.FC<Props> = ({ messagesRef }) => {
  const query = messagesRef.orderBy("createdAt", "desc").limit(25)
  const [messages] = useCollectionData(query, { idField: "id" })

  return (
    <div className="chat-window flex flex-col-reverse pb-3 overflow-y-scroll overflow-x-hidden px-1">
      {messages &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
    </div>
  )
}
