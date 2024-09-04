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
import { Message } from "../interfaces/Message"
import { AuthState } from "./AuthState"

const useGlobalChatState = () => {
  const { db } = AuthState.useContainer()
  const messagesRef = collection(db, "messages")
  const [timestamp] = useState<Timestamp>(Timestamp.now())
  const q = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    where("createdAt", ">", timestamp),
  ) as Query<Message>
  const [messages, isLoading] =
    useCollectionData<Message>(q, { idField: "id" }) ?? []
  const [messageIdBeingRepliedTo, setMessageIdBeingRepliedTo] =
    useState<string>("")
  return {
    messages,
    messageIdBeingRepliedTo,
    setMessageIdBeingRepliedTo,
    isLoading,
  }
}

export const GlobalChatState = createContainer(useGlobalChatState)
