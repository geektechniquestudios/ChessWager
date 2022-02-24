import { useState } from "react"
import { createContainer } from "unstated-next"

const useChatFormData = () => {
  const [formValue, setFormValue] = useState("")
  return { formValue, setFormValue }
}

export const ChatFormData = createContainer(useChatFormData)
