import { createContainer } from "unstated-next"
import type { Conversation } from "../../interfaces/Conversation"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "./Auth"
import { firebaseApp } from "../../config"
import {
  collection,
  doc,
  getFirestore,
  Query,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { useEffect } from "react"
import { UserMenuState } from "./UserMenuState"
import { DropdownState } from "./DropdownState"

const db = getFirestore(firebaseApp)

const useConversationsState = () => {
  const { auth } = Auth.useContainer()
  const conversationsCollectionRef = collection(db, "conversations")
  const q = query(
    conversationsCollectionRef,
    where("userIds", "array-contains", auth.currentUser?.uid ?? ""),
  ) as Query<Conversation>
  const [conversations, isLoading] =
    useCollectionData<Conversation>(q, { idField: "id" }) ?? []

  const specificConvoCollectionRef = (docId: string) =>
    collection(doc(db, "conversations", docId), "messages")

  const { userIdFromMessages } = UserMenuState.useContainer()
  const { isDropdownOpen, activeMenu } = DropdownState.useContainer()

  useEffect(() => {
    if (auth.currentUser && isDropdownOpen && activeMenu === "conversation") {
      conversations
        ?.filter((conversation: Conversation) =>
          conversation.userIds.includes(userIdFromMessages),
        )
        .forEach((conversation: Conversation) => {
          const conversationDocRef = doc(db, "conversations", conversation.id)
          const isUser1 =
            (conversation?.user1.id ?? "") === (auth.currentUser?.uid ?? " ")
          const isUser2 =
            (conversation?.user2.id ?? "") === (auth.currentUser?.uid ?? " ")
          if (isUser1) {
            updateDoc(conversationDocRef, {
              doesUser1HaveUnreadMessages: false,
            })
          } else if (isUser2) {
            updateDoc(conversationDocRef, {
              doesUser2HaveUnreadMessages: false,
            })
          }
        })
    }
  }, [conversations])

  return {
    conversations,
    isLoading,
    specificConvoCollectionRef,
  }
}

export const ConversationsState = createContainer(useConversationsState)
