import { createContainer } from "unstated-next"
import type { Conversation } from "../../interfaces/Conversation"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "./Auth"
import { firebaseApp } from "../../config"
import { collection, doc, getFirestore, query, where } from "firebase/firestore"

const db = getFirestore(firebaseApp)

const useConversationsState = () => {
  const { auth } = Auth.useContainer()
  const conversationsCollectionRef = collection(db, "conversations")
  const q = query(
    conversationsCollectionRef,
    where("userIds", "array-contains", auth.currentUser?.uid ?? ""),
  )
  const [conversations, isLoading] =
    useCollectionData<[Conversation[], boolean] | any>(q, { idField: "id" }) ??
    []

  const specificConvoCollectionRef = (docId: string) =>
    collection(doc(db, "conversations", docId), "messages")

  const convoUserList =
    conversations?.map((conversation: Conversation) =>
      auth.currentUser?.uid === conversation.user1.id
        ? conversation.user2
        : conversation.user1,
    ) ?? []

  const doesUserHaveNewMessages =
    (conversations
      ?.map((conversation: Conversation) =>
        auth.currentUser?.uid === conversation.user1.id
          ? conversation.doesUser1HaveNewMessages
          : conversation.doesUser2HaveNewMessages,
      )
      .filter((hasNewMessages: boolean) => hasNewMessages).length ?? 0) > 0

  const isUser1 = (conversation: Conversation) =>
    auth.currentUser?.uid === conversation.user1.id

  return {
    doesUserHaveNewMessages,
    convoUserList,
    conversations,
    isLoading,
    specificConvoCollectionRef,
    isUser1,
  }
}

export const ConversationsState = createContainer(useConversationsState)
