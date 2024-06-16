import { motion } from "framer-motion"
import { Message } from "../../interfaces/Message"
import { MessageBody } from "./MessageBody"
import { UserTitle } from "./UserTitle"
import { useEffect, useRef, useState } from "react"

interface Props {
  message: Message
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const { uid, photoURL, userName } = message
  const [isClamped, setIsClamped] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = messageRef.current
    if (element && element.scrollHeight > element.clientHeight) {
      setIsClamped(true)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", mass: 0.1, stiffness: 200 }}
      className={`color-shift w-full gap-1.5 rounded-md p-2 text-sm hover:bg-stone-100 dark:hover:bg-stone-950`}
      layout
    >
      <div className={`${showMore ? "" : "line-clamp-3"}`}>
        <UserTitle photoURL={photoURL} userName={userName} uid={uid} />
        <MessageBody message={message} messageRef={messageRef} />
      </div>
      {isClamped && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="color-shift text-xs font-semibold text-stone-400 hover:text-stone-500 dark:text-stone-500 dark:hover:text-stone-400"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </motion.div>
  )
}
