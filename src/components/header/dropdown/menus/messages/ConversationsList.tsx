import "../../../../../style/scrollbar.scss"
import { DropdownConvoItem } from "../../DropdownConvoItem"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { ConversationsState } from "../../../../containers/ConversationsState"
import { Conversation, User } from "../../../../../interfaces/Conversation"
import { Auth } from "../../../../containers/Auth"

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
                  <DropdownConvoItem
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
                    }}
                    messageThumbnail={conversation.messageThumbnail}
                  />
                ))}
          </>
          <>
            {(conversations?.length ?? 0) === 0 && (
              <div className="mt-3 w-full justify-center flex">
                No messages yet
              </div>
            )}
          </>
        </>
      )}
    </div>
  )
}
