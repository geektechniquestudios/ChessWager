import "../../style/chat.scss"
import "../../style/buttons.scss"

import { useRef } from "react"
import { ChatHeader } from "./ChatHeader"
import { ChatForm } from "./ChatForm"
import { ChatBody } from "./ChatBody"
import { ChatFormData } from "../containers/ChatFormData"
import { collection, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../config"

const db = getFirestore(firebaseApp)

export const GlobalChat: React.FC = () => {
  const dummy = useRef<HTMLInputElement>(null)
  const messagesRef = collection(db, "messages")

  const { chatFormValue, setChatFormValue } = ChatFormData.useContainer()
  return (
    <div
      id="global-chat"
      className="global-chat flex flex-col border-l border-stone-400 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 color-shift"
      style={{ width: "21em" }}
    >
      <ChatHeader />
      <main className="global-chat-main flex flex-col-reverse">
        <ChatForm
          dummy={dummy}
          messagesRef={messagesRef}
          formValue={chatFormValue}
          setFormValue={setChatFormValue}
        />
        <span ref={dummy} />
        <ChatBody messagesRef={messagesRef} />
      </main>
    </div>
  )
}
