import {
  collection,
  orderBy,
  Query,
  query,
  Timestamp,
  where,
} from "firebase/firestore"
import { useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { createContainer } from "unstated-next"
import { Message } from "../../interfaces/Message"
import { Auth } from "./Auth"

const useGlobalChatState = () => {
  const { db } = Auth.useContainer()
  const messagesRef = collection(db, "messages")
  const [timestamp] = useState<Timestamp>(Timestamp.now())
  const q = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    where("createdAt", ">", timestamp),
  ) as Query<Message>
  const [messages] = useCollectionData<Message>(q)
  return { messages }
}

export const GlobalChatState = createContainer(useGlobalChatState)
