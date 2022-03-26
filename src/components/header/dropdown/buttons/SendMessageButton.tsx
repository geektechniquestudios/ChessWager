import { RiMailSendLine } from "react-icons/ri"
import { DropdownState } from "../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

import firebase from "firebase/compat/app"
import { Auth } from "../../../containers/Auth"

const firestore = firebase.firestore()

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
    const convoDoc = firestore.collection("conversations").doc(docId)
    convoDoc.set({
      msgThumbnail: "",
      userIds: [id, auth.currentUser?.uid],
      user1: {
        id: auth.currentUser?.uid,
        displayName: auth.currentUser?.displayName,
        photoUrl: auth.currentUser?.photoURL,
        hasNewMessages: false,
        isDeleted: false,
      },
      user2: {
        id: id,
        displayName: displayName,
        photoURL: photoURL,
        hasNewMessages: false,
        isDeleted: false,
      },
    })
  }
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
