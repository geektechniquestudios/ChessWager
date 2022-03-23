import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Auth } from "../../../containers/Auth"
import { Firestore } from "../../../containers/Firestore"
import { UserMenuState } from "../../../containers/UserMenuState"

const firestore = firebase.firestore()

interface Props {}

export const Conversation: React.FC<Props> = ({}) => {
  const { auth } = Auth.useContainer()
  const { searchedUser } = UserMenuState.useContainer()
  const docId = [auth.currentUser?.uid, searchedUser?.id].sort().join("-")

  const conversationsCollectionRef = firestore
    .collection("conversations")
    .doc(docId)
    .collection("messages")
  const query = conversationsCollectionRef
    .orderBy("createdAt", "desc")
    .limit(25)
  const [messages] = useCollectionData(query, { idField: "id" })

  return <> </>
}
