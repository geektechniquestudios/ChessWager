import { useState } from "react"
import { createContainer } from "unstated-next"
import { ReplyingTo } from "../components/chat/ReplyingTo"

const useChatFormState = () => {
  const [chatFormValue, setChatFormValue] = useState("")
  const [convoFormValue, setConvoFormValue] = useState<Map<string, string>>(
    new Map(),
  )
  const [reportFormValue, setReportFormValue] = useState("")
  const [contactFormValue, setContactFormValue] = useState("")
  const [replyingTo, setReplyingTo] = useState("")

  return {
    chatFormValue,
    setChatFormValue,
    convoFormValue,
    setConvoFormValue,
    reportFormValue,
    setReportFormValue,
    contactFormValue,
    setContactFormValue,
    replyingTo,
    setReplyingTo
  }
}

export const ChatFormState = createContainer(useChatFormState)
