import { useState } from "react"
import { createContainer } from "unstated-next"

const useChatFormData = () => {
  const [chatFormValue, setChatFormValue] = useState("")
  const [convoFormValue, setConvoFormValue] = useState<Map<string, string>>(
    new Map(),
  )
  return { chatFormValue, setChatFormValue, convoFormValue, setConvoFormValue }
}

export const ChatFormData = createContainer(useChatFormData)
