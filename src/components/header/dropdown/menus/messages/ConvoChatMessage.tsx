import { motion } from "framer-motion"
import { MessageBody } from "../../../../chat/MessageBody"
import { Auth } from "../../../../containers/Auth"
import { ConvoUserTitle } from "./ConvoUserTitle"

interface Props {
  text: string
  uid: string
  photoURL: string
  userName: string
}

export const ConvoChatMessage: React.FC<Props> = ({
  text,
  uid,
  photoURL,
  userName,
}) => {
  const { user } = Auth.useContainer()
  const isUser = user?.uid === uid
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", mass: 0.1, stiffness: 200 }}
      className={`${
        isUser ? "" : "flex-row-reverse"
      } flex items-center gap-1.5 px-2 py-1`}
    >
      <ConvoUserTitle photoURL={photoURL} userName={userName} uid={uid} />
      <MessageBody text={text} />
    </motion.div>
  )
}
