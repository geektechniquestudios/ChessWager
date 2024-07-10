import type { Message } from "../../interfaces/Message"
import { GlobalChatState } from "../../containers/GlobalChatState"
import { UserDataState } from "../../containers/UserDataState"
import { ChatMessage } from "./message/ChatMessage"
import { LayoutGroup } from "framer-motion"

interface Props {}

export const ChatBody: React.FC<Props> = ({}) => {
  const { userData } = UserDataState.useContainer()
  const { messages } = GlobalChatState.useContainer()

  return (
    <div
      className="scrollbar flex h-full flex-col-reverse overflow-x-clip overflow-y-scroll px-1 pb-3"
      id="global-chat-body"
    >
      <LayoutGroup>
        {messages
          ?.filter((message) => !userData?.blockedUsers?.includes(message.uid))
          .map((message: Message) => (
            <ChatMessage
              key={message.uid + message.createdAt}
              message={message}
            />
          ))}
      </LayoutGroup>
    </div>
  )
}
