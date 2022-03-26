import { createContainer } from "unstated-next"
import firebase from "firebase/compat/app"
import { Conversation } from "../../interfaces/Conversation"
import { FirebaseError } from "firebase/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "./Auth"

const firestore = firebase.firestore()

const useConversationsState = () => {
  const { auth } = Auth.useContainer()
  const conversationsCollectionRef = firestore.collection("conversations")
  const query = conversationsCollectionRef.where(
    "userIds",
    "array-contains",
    auth.currentUser?.uid ?? "",
  )
  const [conversations, isLoading]: [
    Conversation[] | undefined,
    boolean,
    FirebaseError | undefined,
  ] = useCollectionData(query, { idField: "id" }) ?? []

  const specificConvoCollectionRef = (docId: string) =>
    firestore.collection("conversations").doc(docId).collection("messages")

  const convoUserList =
    conversations?.map((conversation) =>
      auth.currentUser?.uid === conversation.user1.id
        ? conversation.user2
        : conversation.user1,
    ) ?? []

  const doesUserHaveNewMessages =
    (conversations
      ?.map((conversation) =>
        auth.currentUser?.uid === conversation.user1.id
          ? conversation.user1
          : conversation.user2,
      )
      .filter((user) => user.hasNewMessages).length ?? 0) > 0
  console.log(doesUserHaveNewMessages)
  return {
    doesUserHaveNewMessages,
    convoUserList,
    conversations,
    isLoading,
    specificConvoCollectionRef,
  }
}

export const ConversationsState = createContainer(useConversationsState)
