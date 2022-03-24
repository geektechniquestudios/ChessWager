import "../../../../style/scrollbar.scss"
import firebase from "firebase/compat/app"
import { FirebaseError } from "firebase/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "../../../containers/Auth"
import { Conversation } from "../../../../interfaces/Conversation"
const firestore = firebase.firestore()

export const ConversationsList: React.FC = ({}) => {
  const { auth } = Auth.useContainer()
  const conversationCollectionRef = firestore.collection("conversations")
  const query = conversationCollectionRef.where(
    "users",
    "array-contains",
    auth.currentUser?.uid ?? "",
  )
  const [conversations, isLoading]: [
    Conversation[] | undefined,
    boolean,
    FirebaseError | undefined,
  ] = useCollectionData(query, { idField: "id" }) ?? []
  return (
    <div className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden dark:text-stone-400 text-stone-400 ml-0.5">
      {(conversations?.length ?? 0) > 1 &&
        conversations?.map(
          (conversation) => conversation.userNames,
          // .filter((userName) => userName !== auth.currentUser?.displayName)
          // .map((userName) => <>{userName}</>),
        )}

      {!isLoading && (conversations?.length ?? 0) === 0 && (
        <div className="m-3 w-full justify-center">No messages yet</div>
      )}
    </div>
  )
}
