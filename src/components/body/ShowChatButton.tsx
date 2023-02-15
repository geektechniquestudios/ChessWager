import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { MdOutlineChatBubbleOutline } from "react-icons/md"
import { ChatToggle } from "../containers/ChatToggle"
import { DarkMode } from "../containers/DarkMode"
import { GlobalChatState } from "../containers/GlobalChatState"

interface Props {}

export const ShowChatButton: React.FC<Props> = ({}) => {
  const { showChat, setShowChat, areNewMessages, setAreNewMessages } =
    ChatToggle.useContainer()
  const { isDarkOn } = DarkMode.useContainer()
  const { messages } = GlobalChatState.useContainer()

  useEffect(() => {
    if ((messages?.length ?? 0) > 0) setAreNewMessages(true)
  }, [messages])

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  useEffect(() => {
    setIsFirstLoad(false)
  }, [])

  return (
    <div className="absolute right-4 top-[5.2em] grow overflow-clip sm:top-14">
      <AnimatePresence>
        {!showChat && (
          <motion.button
            layout
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, delay: isFirstLoad ? 0.9 : 0 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.1 }, x: 30 }}
            id="show-chat-button"
            onClick={() => {
              setShowChat(true)
              localStorage.setItem("showChat", "true")
              setAreNewMessages(false)
            }}
            className="color-shift sticky z-30 rounded-md border border-stone-400 bg-stone-100 p-1.5 hover:bg-white dark:border-stone-600 dark:bg-stone-800 dark:hover:bg-stone-700"
            title="Show Chat"
          >
            <MdOutlineChatBubbleOutline
              size="1.4em"
              className="color-shift text-stone-900 dark:text-stone-50"
              color={areNewMessages ? (isDarkOn ? "#4ade80" : "#16a34a") : ""}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
