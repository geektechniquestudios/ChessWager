import { RiMailSendLine } from "react-icons/ri"
import { DropdownState } from "../../../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"
import { Auth } from "../../../../../containers/Auth"
import { firebaseApp } from "../../../../../../config"
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { UserMenuState } from "../../../../../containers/UserMenuState"

const db = getFirestore(firebaseApp)
interface Props {
  id: string
  displayName: string
  photoURL: string
}

export const SendMessageButton: React.FC<Props> = ({
  id,
  displayName,
  photoURL,
}) => {
  const { goToMenu } = DropdownState.useContainer()
  const { setUserIdFromMessages, setUsernameFromMessages } =
    UserMenuState.useContainer()

  const { auth } = Auth.useContainer()
  const docId = [auth.currentUser?.uid, id].sort().join("-")
  const convoDoc = doc(db, "conversations", docId)

  const createConvoDoc = async () => {
    const loadConvoMenu = () => {
      setUserIdFromMessages(id)
      setUsernameFromMessages(displayName)
      goToMenu("conversation")
    }

    // this will be removed in favor of storing all coversationIds in an arr in the user doc
    const convo = await getDoc(convoDoc)

    if (!convo.exists()) {
      setDoc(convoDoc, {
        messageThumbnail: "",
        modifiedAt: serverTimestamp(),
        userIds: [id, auth.currentUser?.uid],
        user1: {
          id: auth.currentUser?.uid,
          displayName: auth.currentUser?.displayName,
          photoURL: auth.currentUser?.photoURL,
        },
        user2: {
          id: id,
          displayName: displayName,
          photoURL: photoURL,
        },
        isDeletedForUser1: false,
        isDeletedForUser2: false,
        doesUser1HaveUnreadMessages: false,
        doesUser2HaveUnreadMessages: false,
      })
        .then(loadConvoMenu)
        .catch(console.error)
    } else {
      loadConvoMenu()
    }
  }

  return (
    <DropdownButton
      content={<RiMailSendLine />}
      onClick={() => {
        createConvoDoc()
      }}
      title="Send Direct Message"
    />
  )
}
