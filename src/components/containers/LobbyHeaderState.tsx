import { useState } from "react"
import { createContainer } from "unstated-next"

const useLobbyHeaderState = () => {
  const [isDescending, setIsDescending] = useState(true)
  const [mostRecentButton, setMostRecentButton] = useState("")
  const [isRealtime, setIsRealtime] = useState(
    localStorage.getItem("isRealTime") === "true" ||
      localStorage.getItem("isRealTime") === "false"
      ? JSON.parse(localStorage.getItem("isRealTime")!)
      : true,
  )
  return {
    isDescending,
    setIsDescending,
    mostRecentButton,
    setMostRecentButton,
    isRealtime,
    setIsRealtime,
  }
}

export const LobbyHeaderState = createContainer(useLobbyHeaderState)
