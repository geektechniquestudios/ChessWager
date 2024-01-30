import { collection } from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import "../../style/chat.scss"
import { AuthState } from "../../containers/AuthState"
import { ChatFormState } from "../../containers/ChatFormState"
import { ChatToggleState } from "../../containers/ChatToggleState"
import { WindowSizeState } from "../../containers/WindowSizeState"
import { ChatBody } from "./ChatBody"
import { ChatForm } from "./ChatForm"
import { ChatHeader } from "./ChatHeader"

export const PublicChat: React.FC = () => {
  const dummy = useRef<HTMLInputElement>(null)
  const { db } = AuthState.useContainer()
  const messagesRef = collection(db, "messages")

  const { chatFormValue, setChatFormValue } = ChatFormState.useContainer()
  const { showChat } = ChatToggleState.useContainer()
  const { width } = WindowSizeState.useContainer()

  const [isFirstAnimation, setIsFirstAnimation] = useState<boolean>(true)

  useEffect(() => {
    setIsFirstAnimation(false)
  }, [])

  return (
    <AnimatePresence>
      {showChat && (
        <motion.aside
          className="z-40 h-full overflow-x-clip"
          layout
          initial={isFirstAnimation ? false : { width: 0 }}
          animate={{ width: width >= 640 ? "20rem" : width }}
          exit={{ width: 0 }}
          transition={{
            type: "spring",
            mass: 0.3,
          }}
        >
          <div
            id="global-chat"
            className="color-shift flex w-full flex-col border-l border-stone-400 bg-stone-50 dark:border-stone-700 dark:bg-stone-900"
            style={{ minWidth: "20rem" }}
          >
            <ChatHeader />
            <main className="global-chat-main flex min-w-full flex-col-reverse">
              <ChatForm
                dummy={dummy}
                messagesRef={messagesRef}
                formValue={chatFormValue}
                setFormValue={setChatFormValue}
              />
              <span ref={dummy} />
              <ChatBody />
            </main>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
