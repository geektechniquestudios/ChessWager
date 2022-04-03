import { createContainer } from "unstated-next"
import type { Conversation } from "../../interfaces/Conversation"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "./Auth"
import { firebaseApp } from "../../config"
import { collection, doc, getFirestore, query, where } from "firebase/firestore"
import { UserDataState } from "./UserDataState"

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

  return {
    conversations,
    isLoading,
    specificConvoCollectionRef,
  }
}

export const ConversationsState = createContainer(useConversationsState)
