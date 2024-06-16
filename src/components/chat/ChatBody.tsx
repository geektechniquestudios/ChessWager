import type { Message } from "../../interfaces/Message"
import "../../style/scrollbar.scss"
import { GlobalChatState } from "../../containers/GlobalChatState"
import { UserDataState } from "../../containers/UserDataState"
import { ChatMessage } from "./ChatMessage"
import { LayoutGroup, motion } from "framer-motion"

interface Props {}

export const ChatBody: React.FC<Props> = ({}) => {
  const { userData } = UserDataState.useContainer()
  const { messages } = GlobalChatState.useContainer()
  return (
    <motion.div
      className="scrollbar flex h-full flex-col-reverse overflow-x-clip overflow-y-scroll px-1 pb-3"
      id="global-chat-body"
    >
      <LayoutGroup>
        {messages
          ?.filter((message) => !userData?.blockedUsers?.includes(message.uid))
          .sort(
            (a: Message, b: Message) =>
              b.createdAt.seconds - a.createdAt.seconds,
          )
          .map((message: Message) => (
            <ChatMessage
              key={message.uid + message.createdAt}
              message={message}
            />
          ))}
      </LayoutGroup>
    </motion.div>
  )
}
