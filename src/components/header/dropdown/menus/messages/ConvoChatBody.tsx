import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore"
import { useEffect } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { firebaseApp } from "../../../../../config"
import type { Message } from "../../../../../interfaces/Message"
import { Auth } from "../../../../containers/Auth"
import { UserDataState } from "../../../../containers/UserDataState"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { ConvoChatMessage } from "./ConvoChatMessage"
const db = getFirestore(firebaseApp)

interface Props {}

export const ConvoChatBody: React.FC<Props> = ({}) => {
  const { auth } = Auth.useContainer()
  const { userIdFromMessages } = UserMenuState.useContainer()
  const convoId = [auth.currentUser?.uid, userIdFromMessages].sort().join("-")
  const messagesRef = collection(doc(db, "conversations", convoId), "messages")

  const q = query(messagesRef, orderBy("createdAt", "asc"))
  const [messages] = useCollectionData<[Message[]] | any>(q, { idField: "id" })
  const { userData } = UserDataState.useContainer()

  useEffect(() => {
    console.log("convo chat body")
  }, [userIdFromMessages])

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
          .map((message: Message, index: number) => (
            <ConvoChatMessage key={index} {...message} />
          ))}
      </div>
    </div>
  )
}
