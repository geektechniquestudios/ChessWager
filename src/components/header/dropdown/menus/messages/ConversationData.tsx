import { collection, doc, getFirestore } from "firebase/firestore"
import { useRef } from "react"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"
import { ChatFormData } from "../../../../containers/ChatFormData"
import { UserMenuState } from "../../../../containers/UserMenuState"
import { ConvoChatBody } from "./ConvoChatBody"
import { ConvoChatForm } from "./ConvoChatForm"

const db = getFirestore(firebaseApp)

interface Props {}

export const ConversationData: React.FC<Props> = ({}) => {
  const { auth } = Auth.useContainer()
  const { userIdFromMessages } = UserMenuState.useContainer()
  const docId = [auth.currentUser?.uid, userIdFromMessages].sort().join("-")

  const messagesRef = collection(
    doc(db, "conversations", docId),
    "messages",
  )

  const conversationDocRef = doc(db, "conversations", docId)

  const dummy = useRef<HTMLInputElement>(null)
  const { convoFormValue, setConvoFormValue } = ChatFormData.useContainer()
  const setFormValue = (formValue: string) => {
    const newMap = new Map(convoFormValue)
    newMap.set(docId, formValue)
    setConvoFormValue(newMap)
  }

  return (
    <div className="flex flex-col-reverse h-96">
      <ConvoChatForm
        dummy={dummy}
        messagesRef={messagesRef}
        formValue={convoFormValue.get(docId) ?? ""}
        setFormValue={setFormValue}
        conversationDocRef={conversationDocRef}
      />
      <span ref={dummy} />
      <ConvoChatBody messagesRef={messagesRef} />
    </div>
  )
}
