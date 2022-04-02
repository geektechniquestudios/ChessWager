import { RiMailSendLine } from "react-icons/ri"
import { DropdownState } from "../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"
import { Auth } from "../../../containers/Auth"
import { firebaseApp } from "../../../../config"
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore"

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
  const { setActiveMenu } = DropdownState.useContainer()

  const { auth } = Auth.useContainer()
  const docId = [auth.currentUser?.uid, id].sort().join("-")

  const createConvoDoc = () => {
    const convoDoc = doc(db, "conversations", docId)
    // const userDoc1 = firestore
    //   .collection("conversations")
    //   .doc(docId)
    //   .collection("users")
    //   .doc(auth.currentUser?.uid)
    // const userDoc2 = firestore
    //   .collection("conversations")
    //   .doc(docId)
    //   .collection("users")
    //   .doc(id)

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
  // userDoc1.set({
  //   id: auth.currentUser?.uid,
  //   displayName: auth.currentUser?.displayName,
  //   photoUrl: auth.currentUser?.photoURL,
  //   hasNewMessages: false,
  //   isDeleted: false,
  // })

  // userDoc2.set({
  //   id: id,
  //   displayName: displayName,
  //   photoURL: photoURL,
  //   hasNewMessages: false,
  //   isDeleted: false,
  // })

  return (
    <DropdownButton
      content={<RiMailSendLine />}
      onClick={() => {
        setActiveMenu("directMessage")
        createConvoDoc()
      }}
      title="Send Direct Message"
    />
  )
}
