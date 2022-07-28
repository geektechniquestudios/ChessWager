import { createContainer } from "unstated-next"
import type { Conversation } from "../../interfaces/Conversation"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "./Auth"
import { firebaseApp } from "../../config"
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { UserMenuState } from "./UserMenuState"
import { DropdownState } from "./DropdownState"

const db = getFirestore(firebaseApp)

const useConversationsState = () => {
  const { auth } = Auth.useContainer()

  const conversationsCollectionRef = collection(db, "conversations")

  const specificConvoCollectionRef = (docId: string) =>
    collection(doc(db, "conversations", docId), "messages")

  const { userIdFromMessages } = UserMenuState.useContainer()
  const { isDropdownOpen, activeMenu } = DropdownState.useContainer()

  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [timestamp] = useState<Timestamp>(Timestamp.now())
  const [hasInitialLoad, setHasInitialLoad] = useState(false)

  const q = query(
    conversationsCollectionRef,
    orderBy("modifiedAt", "desc"),
    where("modifiedAt", ">", timestamp),
    where("userIds", "array-contains", auth.currentUser?.uid ?? ""),
  ) as Query<Conversation>

  const [conversations] =
    useCollectionData<Conversation>(q, { idField: "id" }) ?? []

  const [oldConversations, setOldConversations] = useState<Conversation[]>([])

  const buildFullConversations = () => {
    const fullConversations: Conversation[] = [
      ...(conversations ?? []),
      ...(oldConversations ?? []),
    ]
    // remove older conversation if duplicate id
    const uniqueConversations = fullConversations.filter(
      (convo, index) =>
        fullConversations.findIndex((c) => c.id === convo.id) === index,
    )
    return uniqueConversations
  }
  const fullConversations = buildFullConversations()

  const loadMoreConversations = async () => {
    const amountToLoad = 7
    const lastVisible =
      fullConversations?.[oldConversations.length - 1]?.modifiedAt ?? timestamp
    const q2 = query(
      conversationsCollectionRef,
      where("userIds", "array-contains", auth.currentUser?.uid ?? ""),
      orderBy("modifiedAt", "desc"),
      limit(amountToLoad),
      startAfter(lastVisible),
    ) as Query<Conversation>

    const moreOldConversations = (await getDocs(q2)).docs.map((d) => {
      let conversation = d.data() as Conversation
      conversation.id = d.id
      return conversation
    }) as Conversation[]

    setOldConversations([
      ...(oldConversations ?? []),
      ...(moreOldConversations ?? []),
    ])
    if (moreOldConversations.length < amountToLoad) setHasMore(false)
  }

  useEffect(() => {
    if (auth.currentUser && isDropdownOpen && activeMenu === "conversation") {
      oldConversations
        ?.filter((conversation: Conversation) =>
          conversation.userIds.includes(userIdFromMessages),
        )
        .forEach((conversation: Conversation) => {
          const conversationDocRef = doc(db, "conversations", conversation.id)
          const isUser1 =
            (conversation?.user1.id ?? "") === (auth.currentUser?.uid ?? " ")
          const isUser2 =
            (conversation?.user2.id ?? "") === (auth.currentUser?.uid ?? " ")
          if (isUser1 && conversation.doesUser1HaveUnreadMessages) {
            updateDoc(conversationDocRef, {
              doesUser1HaveUnreadMessages: false,
            })
          } else if (isUser2 && conversation.doesUser2HaveUnreadMessages) {
            updateDoc(conversationDocRef, {
              doesUser2HaveUnreadMessages: false,
            })
          }
        })
    }
  }, [oldConversations])

  return {
    fullConversations,
    isLoading,
    setIsLoading,
    hasMore,
    loadMoreConversations,
    specificConvoCollectionRef,
    hasInitialLoad,
    setHasInitialLoad,
  }
}

export const ConversationsState = createContainer(useConversationsState)
