import {
  CollectionReference,
  DocumentData,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import type { Message } from "../../../../../interfaces/Message"
import { UserDataState } from "../../../../containers/UserDataState"
import { ConvoChatMessage } from "./ConvoChatMessage"

interface Props {
  messagesRef: CollectionReference<DocumentData>
}

export const ConvoChatBody: React.FC<Props> = ({ messagesRef }) => {
  const q = query(messagesRef, orderBy("createdAt", "asc"))
  const [messages] = useCollectionData<[Message[]] | any>(q, { idField: "id" })
  const { userData } = UserDataState.useContainer()
  return (
    <div
      className="scrollbar flex flex-col-reverse pt-3 overflow-y-auto overflow-x-hidden px-1 h-full"
      style={{ direction: "rtl" }}
    >
      <div style={{ direction: "ltr" }}>
        {messages
          ?.filter(
            (bet) =>
              !userData.blockedUsers.includes(bet.user1Id) &&
              !userData.blockedUsers.includes(bet.user2Id),
          )
          // .sort((a, b) => a.createdAt - b.createdAt)
          .map((message: Message, index: number) => (
            <ConvoChatMessage key={index} {...message} />
          ))}
      </div>
    </div>
  )
}
