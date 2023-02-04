import "../../style/chat.scss"
import "../../style/buttons.scss"

import { useRef } from "react"
import { ChatHeader } from "./ChatHeader"
import { ChatForm } from "./ChatForm"
import { ChatBody } from "./ChatBody"
import { ChatFormData } from "../containers/ChatFormData"
import { collection, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../../firestore.config"
import { ChatToggle } from "../containers/ChatToggle"
import { AnimatePresence, motion } from "framer-motion"

const db = getFirestore(firebaseApp)

export const PublicChat: React.FC = () => {
  const dummy = useRef<HTMLInputElement>(null)
  const messagesRef = collection(db, "messages")

  const { chatFormValue, setChatFormValue } = ChatFormData.useContainer()
  const { showChat } = ChatToggle.useContainer()

  return (
    <>
      <AnimatePresence>
        {showChat && (
          <motion.aside
            className="h-full"
            layout
            // initial={{ opacity: 0, x: -25, y: -5 }}
            // animate={{ opacity: 1, x: 0, y: 0 }}
            // exit={{ opacity: 0, x: -25, y: -5 }}
            // transition={{
            //   duration: 0.04,
            //   type: "spring",
            //   stiffness: 120,
            //   damping: 20,
            //   mass: 0.5,
            //   bounce: 0.2,
            // }}
          >
            <div
              id="global-chat"
              className="global-chat color-shift flex w-screen flex-col border-l border-stone-400 bg-stone-50 dark:border-stone-700 dark:bg-stone-900 sm:w-80"
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
                <ChatBody />
              </main>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
