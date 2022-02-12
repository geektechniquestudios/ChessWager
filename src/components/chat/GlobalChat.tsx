import "../../style/chat.scss"
import "../../style/buttons.scss"

import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/analytics"

import { useRef } from "react"
import { Firestore } from "../containers/Firestore"
import { ChatHeader } from "./ChatHeader"
import { ChatForm } from "./ChatForm"
import { ChatBody } from "./ChatBody"

interface Props {
  formValue: string
  setFormValue: React.Dispatch<React.SetStateAction<string>>
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalChat: React.FC<Props> = ({
  formValue,
  setFormValue,
  setShowChat,
  setActiveMenu,
  setOpen,
}) => {
  const { firestore } = Firestore.useContainer()

  const dummy = useRef<HTMLInputElement>(null)
  const messagesRef = firestore.collection("messages")

  return (
    <div
      className="global-chat border-l border-stone-400 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
      style={{ width: "21em" }}
    >
      <ChatHeader
        setActiveMenu={setActiveMenu}
        setOpen={setOpen}
        setShowChat={setShowChat}
      />
      <main>
        <ChatForm
          formValue={formValue}
          setFormValue={setFormValue}
          dummy={dummy}
          messagesRef={messagesRef}
        />
        <span ref={dummy}></span>
        <ChatBody messagesRef={messagesRef} />
      </main>
    </div>
  )
}

export default GlobalChat
