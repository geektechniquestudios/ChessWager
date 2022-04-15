import { useState } from "react"
import { createContainer } from "unstated-next"

const useChatToggle = () => {
  const [showChat, setShowChat] = useState(
    localStorage.getItem("showChat") === "true" ||
      localStorage.getItem("showChat") === "false"
      ? JSON.parse(localStorage.getItem("showChat")!)
      : true,
  )

  return { showChat, setShowChat }
}

export const ChatToggle = createContainer(useChatToggle)
