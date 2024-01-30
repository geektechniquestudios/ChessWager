import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { MdOutlineChatBubbleOutline } from "react-icons/md"
import { ChatToggleState } from "../../containers/ChatToggleState"
import { DarkModeState } from "../../containers/DarkModeState"
import { GlobalChatState } from "../../containers/GlobalChatState"

interface Props {}

export const ShowChatButton: React.FC<Props> = ({}) => {
  const { showChat, setShowChat, areNewMessages, setAreNewMessages } =
    ChatToggleState.useContainer()
  const { isDarkOn } = DarkModeState.useContainer()
  const { messages } = GlobalChatState.useContainer()

  useEffect(() => {
    if ((messages?.length ?? 0) > 0) setAreNewMessages(true)
  }, [messages])

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  useEffect(() => {
    setIsFirstLoad(false)
  }, [])

  return (
    <div className="absolute right-4 top-14 grow overflow-clip">
      <AnimatePresence>
        {!showChat && (
          <motion.button
            layout
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.3,
                delay: isFirstLoad ? 0.8 : 0,
              },
            }}
            whileHover={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 }, x: 30 }}
            id="show-chat-button"
            onClick={() => {
              setShowChat(true)
              localStorage.setItem("showChat", "true")
              setAreNewMessages(false)
            }}
            className="color-shift sticky z-30 rounded-md border border-stone-400 bg-stone-100 bg-opacity-40 p-1.5 hover:bg-white hover:bg-opacity-100 dark:border-stone-600 dark:bg-stone-800 dark:bg-opacity-40 dark:hover:bg-stone-700 dark:hover:bg-opacity-100"
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
