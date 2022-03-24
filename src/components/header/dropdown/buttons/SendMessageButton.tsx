import { RiMailSendLine } from "react-icons/ri"
import { DropdownState } from "../../../containers/DropdownState"
import { DropdownButton } from "./DropdownButton"

import firebase from "firebase/compat/app"
import { Auth } from "../../../containers/Auth"

const firestore = firebase.firestore()

interface Props {
  id: string
  displayName: string
}

export const SendMessageButton: React.FC<Props> = ({ id, displayName }) => {
  const { setActiveMenu } = DropdownState.useContainer()

  const { auth } = Auth.useContainer()
  const docId = [auth.currentUser?.uid, id].sort().join("-")

  const createConvoDoc = () => {
    const convoDoc = firestore.collection("conversations").doc(docId)
    convoDoc.set({
      users: [id, auth.currentUser?.uid],
      userNames: [displayName, auth.currentUser?.displayName],
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
