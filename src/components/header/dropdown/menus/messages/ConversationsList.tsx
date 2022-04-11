import "../../../../../style/scrollbar.scss"
import { ConvoItem } from "./ConvoItem"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { ConversationsState } from "../../../../containers/ConversationsState"
import { Conversation, User } from "../../../../../interfaces/Conversation"
import { Auth } from "../../../../containers/Auth"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import { firebaseApp } from "../../../../../config"

const db = getFirestore(firebaseApp)

export const ConversationsList: React.FC = ({}) => {
  const { conversations, isLoading, specificConvoCollectionRef } =
    ConversationsState.useContainer()
  const { setUserIdFromMessages, setUsernameFromMessages } =
    UserMenuState.useContainer()

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
      setDoc(
        conversationDocRef,
        {
          doesUser1HaveUnreadMessages: false,
        },
        { merge: true },
      )
    } else if (isUser2) {
      setDoc(
        conversationDocRef,
        {
          doesUser2HaveUnreadMessages: false,
        },
        { merge: true },
      )
    }
  }

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

  return (
    <div className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden dark:text-stone-400 text-stone-400 ml-0.5">
      {!isLoading && (
        <>
          <>
            {(conversations?.length ?? 0) > 0 &&
              conversations
                ?.sort((a, b) => a.modifiedAt - b.modifiedAt)
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
                        className="w-6 h-6 rounded-full grid place-content-center"
                      />
                    }
                    goToMenu="conversation"
                    onClick={() => {
                      setUserIdFromMessages(user.id)
                      setUsernameFromMessages(user.displayName)
                      setAsRead(conversation)
                    }}
                    messageThumbnail={conversation.messageThumbnail}
                  />
                ))}
          </>
          <>
            {(conversations?.length ?? 0) === 0 && (
              <div className="mt-10 w-full justify-center flex">
                No messages yet
              </div>
            )}
          </>
        </>
      )}
    </div>
  )
}
