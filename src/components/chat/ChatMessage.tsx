import { motion } from "framer-motion"
import { MessageBody } from "./MessageBody"
import { UserTitle } from "./UserTitle"

interface Props {
  text: string
  uid: string
  photoURL: string
  userName: string
}

export const ChatMessage: React.FC<Props> = ({
  text,
  uid,
  photoURL,
  userName,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", mass: 0.1, stiffness: 200 }}
      layout="position"
      className="color-shift color-shift w-full gap-1.5 rounded-md p-2 hover:bg-stone-300 dark:hover:bg-stone-950"
    >
      <UserTitle photoURL={photoURL} userName={userName} uid={uid} />
      <MessageBody text={text} />
    </motion.div>
  )
}
