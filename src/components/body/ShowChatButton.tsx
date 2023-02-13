import { AnimatePresence, motion } from "framer-motion"
import { BiArrowFromRight } from "react-icons/bi"
import { ChatToggle } from "../containers/ChatToggle"

interface Props {}

export const ShowChatButton: React.FC<Props> = ({}) => {
  const { showChat, setShowChat } = ChatToggle.useContainer()

  return (
    <AnimatePresence>
      {!showChat && (
        <motion.button
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
          }}
          id="show-chat-button"
          onClick={() => {
            setShowChat(true)
            localStorage.setItem("showChat", "true")
          }}
          className="color-shift absolute top-20 right-0 z-30 m-3 rounded-md hover:bg-stone-400 dark:hover:bg-stone-700 sm:top-12"
          title="Show Chat"
        >
          <BiArrowFromRight
            size="1.4em"
            className="color-shift m-1 text-stone-900 dark:text-stone-50"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
