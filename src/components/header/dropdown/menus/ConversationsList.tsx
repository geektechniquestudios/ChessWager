import "../../../../style/scrollbar.scss"
import firebase from "firebase/compat/app"
import { FirebaseError } from "firebase/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "../../../containers/Auth"
import { Conversation } from "../../../../interfaces/Conversation"
import { DropdownConvoItem } from "../DropdownConvoItem"
import { UserMenuState } from "../../../containers/UserMenuState"
const firestore = firebase.firestore()

export const ConversationsList: React.FC = ({}) => {
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
                      alt="user"
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
