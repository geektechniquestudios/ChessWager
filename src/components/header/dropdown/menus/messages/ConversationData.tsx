import { useRef } from "react"
import { ConvoChatBody } from "./ConvoChatBody"
import { ConvoChatForm } from "./ConvoChatForm"

interface Props {}

export const ConversationData: React.FC<Props> = ({}) => {
  const dummy = useRef<HTMLInputElement>(null)

  return (
    <div className="flex h-96 flex-col-reverse">
      <ConvoChatForm dummy={dummy} />
      <span ref={dummy} />
      <ConvoChatBody />
    </div>
  )
}
