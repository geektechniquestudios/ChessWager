import { useState } from "react"
import { createContainer } from "unstated-next"

const useChatToggleState = () => {
  const [showChat, setShowChat] = useState(
    window.innerWidth > 640 &&
      (localStorage.getItem("showChat") === "true" ||
        (localStorage.getItem("showChat") === "false"
          ? JSON.parse(localStorage.getItem("showChat")!)
          : true)),
  )
  const [areNewMessages, setAreNewMessages] = useState(false)

  return {
    showChat,
    setShowChat,
    areNewMessages,
    setAreNewMessages,
  }
}

export const ChatToggleState = createContainer(useChatToggleState)
