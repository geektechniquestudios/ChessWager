import { useState } from "react"
import { createContainer } from "unstated-next"

const useLobbyHeaderState = () => {
  const [isDescending, setIsDescending] = useState(true)
  const [mostRecentButton, setMostRecentButton] = useState("")
  const [isRealTime, setIsRealTime] = useState(false)
  return {
    isDescending,
    setIsDescending,
    mostRecentButton,
    setMostRecentButton,
    isRealTime,
    setIsRealTime
  }
}

export const LobbyHeaderState = createContainer(useLobbyHeaderState)
