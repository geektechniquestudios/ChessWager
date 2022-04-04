import { RiMailSendLine } from "react-icons/ri"
import { DropdownState } from "../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"
import { Auth } from "../../../containers/Auth"
import { firebaseApp } from "../../../../config"
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { UserMenuState } from "../../../containers/UserMenuState"
import { SearchedDirectMessage } from "../menus/search/SearchedDirectMessage"

const db = getFirestore(firebaseApp)
interface Props {
  id: string
  displayName: string
  photoURL: string
  clickedOrSearched: string
}

export const SendMessageButton: React.FC<Props> = ({
  id,
  displayName,
  photoURL,
  clickedOrSearched,
}) => {
  const { setActiveMenu } = DropdownState.useContainer()
  const { setUserIdFromMessages, setUsernameFromMessages } =
    UserMenuState.useContainer()

  const { auth } = Auth.useContainer()
  const docId = [auth.currentUser?.uid, id].sort().join("-")

  const createConvoDoc = () => {
    const convoDoc = doc(db, "conversations", docId)

    getDoc(convoDoc)
      .then((doc) => doc.exists())
      .then((doesDocExist) => {
        if (!doesDocExist) {
          setDoc(
            convoDoc,
            {
              messageThumbnail: "",
              userIds: [id, auth.currentUser?.uid],
              user1: {
                id: auth.currentUser?.uid,
                displayName: auth.currentUser?.displayName,
                photoUrl: auth.currentUser?.photoURL,
              },
              user2: {
                id: id,
                displayName: displayName,
                photoURL: photoURL,
              },
              isDeletedForUser1: false,
              isDeletedForUser2: false,
              doesUser1HaveNewMessages: false,
              doesUser2HaveNewMessages: false,
            },
            { merge: true },
          )
        }
      })
  }

  return (
    <DropdownButton
      content={<RiMailSendLine />}
      onClick={() => {
        setActiveMenu(clickedOrSearched + "DirectMessage")
        createConvoDoc()
        setUserIdFromMessages(id)
        setUsernameFromMessages(displayName)
      }}
      title="Send Direct Message"
    />
  )
}
