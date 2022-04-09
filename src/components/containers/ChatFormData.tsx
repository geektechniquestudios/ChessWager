import { useState } from "react"
import { createContainer } from "unstated-next"

const useChatFormData = () => {
  const [chatFormValue, setChatFormValue] = useState("")
  const [convoFormValue, setConvoFormValue] = useState<Map<string, string>>(
    new Map(),
  )
  const [reportFormValue, setReportFormValue] = useState("")
  return {
    chatFormValue,
    setChatFormValue,
    convoFormValue,
    setConvoFormValue,
    reportFormValue,
    setReportFormValue,
  }
}

export const ChatFormData = createContainer(useChatFormData)
