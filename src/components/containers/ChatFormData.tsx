import { useState } from "react"
import { createContainer } from "unstated-next"

const useChatFormData = () => {
  const [chatFormValue, setChatFormValue] = useState("")
  const [convoFormValue, setConvoFormValue] = useState("")
  return { chatFormValue, setChatFormValue, convoFormValue, setConvoFormValue }
}

export const ChatFormData = createContainer(useChatFormData)
