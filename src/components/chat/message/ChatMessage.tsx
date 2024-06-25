import { motion } from "framer-motion"
import { Message } from "../../../interfaces/Message"
import { MessageBody } from "./MessageBody"
import { UserTitle } from "./UserTitle"
import { useEffect, useRef, useState } from "react"
import { ReplyButton } from "./ReplyButton"
import { ShowMoreButton } from "./ShowMoreButton"
import { ReplyTo } from "./ReplyTo"
import { GlobalChatState } from "../../../containers/GlobalChatState"

interface Props {
  message: Message
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const { uid, photoURL, userName } = message

  const [isClampable, setIsClampable] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = messageRef.current
    if (!element) return
    const computedStyle = getComputedStyle(element)
    const lineHeight = parseFloat(computedStyle.lineHeight)
    if (element.scrollHeight > lineHeight * 4) setIsClampable(true)
  }, [])

  const { messageIdBeingRepliedTo, setMessageIdBeingRepliedTo } =
    GlobalChatState.useContainer()
  const repliedMessageStyle =
    message.id === messageIdBeingRepliedTo
      ? "border dark:!border-stone-500 !border-stone-600 dark:bg-stone-600 bg-stone-100 cursor-pointer"
      : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", mass: 0.1, stiffness: 200 }}
      className={`${repliedMessageStyle} color-shift group relative w-full gap-1.5 rounded-md border border-transparent p-2 text-sm hover:border-stone-300 hover:bg-stone-100 dark:hover:border-stone-800 dark:hover:bg-stone-700`}
      layout
      onClick={() => {
        if (message.id === messageIdBeingRepliedTo)
          setMessageIdBeingRepliedTo("")
      }}
    >
      <ReplyButton messageId={message.id} uid={uid} />
      <ReplyTo message={message} />
      <div className={`${showMore ? "" : "line-clamp-4"} overflow-clip`}>
        <UserTitle photoURL={photoURL} userName={userName} uid={uid} />
        <MessageBody message={message} messageRef={messageRef} />
      </div>
      <ShowMoreButton
        showMore={showMore}
        setShowMore={setShowMore}
        isClampable={isClampable}
      />
    </motion.div>
  )
}
