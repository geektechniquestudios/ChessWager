import { ConvoChatBody } from "./ConvoChatBody"
import { ConvoChatForm } from "./ConvoChatForm"

interface Props {}

export const ConversationData: React.FC<Props> = ({}) => {
  return (
    <div className="relative flex h-96 flex-col-reverse">
      <ConvoChatForm />
      <ConvoChatBody />
    </div>
  )
}
