import { useRef } from "react"
import { ConvoChatBody } from "./ConvoChatBody"
import { ConvoChatForm } from "./ConvoChatForm"

interface Props {}

export const ConversationData: React.FC<Props> = ({}) => {
  const dummy = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col-reverse h-96">
      <ConvoChatForm dummy={dummy} />
      <span ref={dummy} />
      <ConvoChatBody />
    </div>
  )
}
