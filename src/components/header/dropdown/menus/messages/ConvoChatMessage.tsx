import { motion } from "framer-motion"
import { Message } from "../../../../../interfaces/Message"
import { MessageBody } from "../../../../chat/message/MessageBody"
import { AuthState } from "../../../../../containers/AuthState"
import { ConvoUserTitle } from "./ConvoUserTitle"

interface Props {
  message: Message
}

export const ConvoChatMessage: React.FC<Props> = ({ message }) => {
  const { user } = AuthState.useContainer()

  const isUser = user?.uid === message.uid
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", mass: 0.1, stiffness: 200 }}
      className={`${
        isUser ? "pl-3 pr-10" : "flex-row-reverse pl-10 pr-3"
      } flex items-center gap-1.5 py-1`}
    >
      <ConvoUserTitle message={message} />
      <MessageBody message={message} />
    </motion.div>
  )
}
