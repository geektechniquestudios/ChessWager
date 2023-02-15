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
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.1,
            },
          }}
          id="show-chat-button"
          onClick={() => {
            setShowChat(true)
            localStorage.setItem("showChat", "true")
            setAreNewMessages(false)
          }}
          className="color-shift absolute right-0 top-0 z-30 mr-2 mt-11 rounded-md border border-stone-400 bg-stone-100 p-0.5 hover:bg-white dark:border-stone-600 dark:bg-stone-800 dark:hover:bg-stone-700 sm:mt-2"
          title="Show Chat"
        >
          <MdOutlineChatBubbleOutline
            size="1.4em"
            className="color-shift m-1 text-stone-900 dark:text-stone-50"
            color={areNewMessages ? (isDarkOn ? "#4ade80" : "#16a34a") : ""}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
