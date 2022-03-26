import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { ConvoChatMessage } from "./ConvoChatMessage"

interface Props {
  messagesRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
}
export const ConvoChatBody: React.FC<Props> = ({ messagesRef }) => {
  const query = messagesRef.orderBy("createdAt", "desc").limit(25)
  const [messages] = useCollectionData(query, { idField: "id" })
  return (
    <div className="scrollbar flex flex-col-reverse pb-3 overflow-y-auto overflow-x-hidden px-1">
      {messages?.map((message) => (
        <ConvoChatMessage key={message.id} {...message} />
      ))}
    </div>
  )
}
