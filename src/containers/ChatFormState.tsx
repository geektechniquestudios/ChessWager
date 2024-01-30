import { useState } from "react"
import { createContainer } from "unstated-next"

const useChatFormState = () => {
  const [chatFormValue, setChatFormValue] = useState("")
  const [convoFormValue, setConvoFormValue] = useState<Map<string, string>>(
    new Map(),
  )
  const [reportFormValue, setReportFormValue] = useState("")
  const [contactFormValue, setContactFormValue] = useState("")
  return {
    chatFormValue,
    setChatFormValue,
    convoFormValue,
    setConvoFormValue,
    reportFormValue,
    setReportFormValue,
    contactFormValue,
    setContactFormValue,
  }
}

export const ChatFormState = createContainer(useChatFormState)
