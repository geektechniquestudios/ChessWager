import { motion } from "framer-motion"
import { Message } from "../../interfaces/Message"
import { MessageBody } from "./MessageBody"
import { UserTitle } from "./UserTitle"

interface Props {
  message: Message
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const { uid, photoURL, userName } = message

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", mass: 0.1, stiffness: 200 }}
      layout="position"
      className="color-shift color-shift w-full gap-1.5 rounded-md p-2 hover:bg-stone-300 dark:hover:bg-stone-950"
    >
      <UserTitle photoURL={photoURL} userName={userName} uid={uid} />
      <MessageBody message={message} />
    </motion.div>
  )
}
