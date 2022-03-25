import "../../../../style/scrollbar.scss"
import firebase from "firebase/compat/app"
import { FirebaseError } from "firebase/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "../../../containers/Auth"
import { Conversation } from "../../../../interfaces/Conversation"
import { DropdownConvoItem } from "../DropdownConvoItem"
import { UserMenuState } from "../../../containers/UserMenuState"
import { ConversationsState } from "../../../containers/ConversationsState"

export const ConversationsList: React.FC = ({}) => {
  const {
    conversations,
    convoUserList,
    isLoading,
    specificConvoCollectionRef,
  } = ConversationsState.useContainer()
  const { setUserIdFromMessages, setUsernameFromMessages } =
    UserMenuState.useContainer()
  return (
    <div className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden dark:text-stone-400 text-stone-400 ml-0.5">
      {!isLoading && (
        <>
          <>
            {(conversations?.length ?? 0) > 0 &&
              convoUserList.map((user, index) => (
                <DropdownConvoItem
                  userId={user.id}
                  text={user.displayName}
                  key={index + user.displayName}
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
