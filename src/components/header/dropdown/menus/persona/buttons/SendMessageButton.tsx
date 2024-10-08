import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { RiMailSendLine } from "react-icons/ri"
import { AuthState } from "../../../../../../containers/AuthState"
import { DropdownState } from "../../../../../../containers/DropdownState"
import { UserMenuState } from "../../../../../../containers/UserMenuState"
import { DropdownButton } from "./DropdownButton"

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

  const { auth, db } = AuthState.useContainer()
  const docId = [auth.currentUser?.uid, id].sort().join("-")
  const convoDoc = doc(db, "conversations", docId)

  const createConvoDoc = async () => {
    const loadConvoMenu = () => {
      setUserIdFromMessages(id)
      setUsernameFromMessages(displayName)
      goToMenu("conversation")
    }

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
