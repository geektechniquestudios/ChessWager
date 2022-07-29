import "../../../../../style/scrollbar.scss"
import { ConvoItem } from "./ConvoItem"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { ConversationsState } from "../../../../containers/ConversationsState"
import { Conversation, User } from "../../../../../interfaces/Conversation"
import { Auth } from "../../../../containers/Auth"
import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { UserDataState } from "../../../../containers/UserDataState"
import { DropdownState } from "../../../../containers/DropdownState"
import { useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { LinearProgress } from "@mui/material"
import { DarkMode } from "../../../../containers/DarkMode"

const db = getFirestore(firebaseApp)

export const ConversationsList: React.FC = ({}) => {
  const {
    fullConversations,
    isLoading,
    setIsLoading,
    specificConvoCollectionRef,
    loadMoreConversations,
    hasMore,
    hasInitialLoad,
    setHasInitialLoad,
  } = ConversationsState.useContainer()
  const { isDarkOn } = DarkMode.useContainer()
  const { setUserIdFromMessages, setUsernameFromMessages } =
    UserMenuState.useContainer()
  const { userData } = UserDataState.useContainer()
  const { auth } = Auth.useContainer()
  const convoToConvoAndUser = (
    conversation: Conversation,
  ): [Conversation, User] =>
    auth.currentUser?.uid === conversation.user1.id
      ? [conversation, conversation.user2]
      : [conversation, conversation.user1]

  const setAsRead = (conversation: Conversation) => {
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
  }

  useEffect(() => {
    if (hasInitialLoad) return
    loadMoreConversations().then(() => {
      setIsLoading(false)
      setHasInitialLoad(true)
    })
  }, [])

  const isRead = (conversation: Conversation): boolean => {
    const isUser1 =
      (conversation?.user1.id ?? "") === (auth.currentUser?.uid ?? " ")
    const isUser2 =
      (conversation?.user2.id ?? "") === (auth.currentUser?.uid ?? " ")
    return (
      (isUser1 && !conversation.doesUser1HaveUnreadMessages) ||
      (isUser2 && !conversation.doesUser2HaveUnreadMessages)
    )
  }

  const { menuStack, setMenuStack } = DropdownState.useContainer()
  return (
    <div
      className="scrollbar-dropdown ml-0.5 h-72 w-full overflow-y-auto overflow-x-hidden text-stone-400 dark:text-stone-400"
      style={{ direction: "rtl" }}
      id="conversations-scroll-div"
    >
      {!isLoading && (
        <>
          <InfiniteScroll
            scrollThreshold="200px"
            scrollableTarget="conversations-scroll-div"
            dataLength={fullConversations?.length ?? 0}
            next={loadMoreConversations}
            hasMore={hasMore}
            loader={<LinearProgress />}
            className="flex flex-col"
          >
            <div style={{ direction: "ltr" }} id="conversations-list">
              {(fullConversations?.length ?? 0) > 0 &&
                fullConversations
                  ?.filter(
                    (conversation: Conversation) =>
                      !userData?.blockedUsers.includes(conversation.user1.id) &&
                      !userData?.blockedUsers.includes(conversation.user2.id),
                  )
                  .map(convoToConvoAndUser)
                  .map(([conversation, user], index: number) => (
                    <ConvoItem
                      isRead={isRead(conversation)}
                      userId={user.id}
                      userName={user.displayName}
                      key={index}
                      specificConvoCollectionRef={specificConvoCollectionRef}
                      leftIcon={
                        <img
                          src={user.photoURL}
                          alt=""
                          className="grid h-6 w-6 place-content-center rounded-full"
                        />
                      }
                      goToMenu="conversation"
                      onClick={() => {
                        setUserIdFromMessages(user.id)
                        setUsernameFromMessages(user.displayName)
                        setAsRead(conversation)
                        setMenuStack([...menuStack, "conversation"])
                      }}
                      messageThumbnail={conversation.messageThumbnail}
                    />
                  ))}
            </div>
          </InfiniteScroll>
          <>
            {(fullConversations?.length ?? 0) === 0 && (
              <div className="mt-10 flex w-full justify-center">
                No messages yet
              </div>
            )}
          </>
        </>
      )}
    </div>
  )
}
