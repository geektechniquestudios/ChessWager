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

export const GlobalChat: React.FC = () => {
  const { firestore } = Firestore.useContainer()

  const dummy = useRef<HTMLInputElement>(null)
  const messagesRef = firestore.collection("messages")

  return (
    <div
      className="global-chat flex flex-col border-l border-stone-400 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 color-shift"
      style={{ width: "21em" }}
    >
      <ChatHeader />
      <main className="global-chat-main flex flex-col-reverse">
        <ChatForm dummy={dummy} messagesRef={messagesRef} />
        <span ref={dummy}></span>
        <ChatBody messagesRef={messagesRef} />
      </main>
    </div>
  )
}

export default GlobalChat
