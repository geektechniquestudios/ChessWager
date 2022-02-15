import { useState } from "react"
import { createContainer } from "unstated-next"

const useLobbyHeaderState = () => {
  const [isDescending, setIsDescending] = useState(true)
  const [mostRecentButton, setMostRecentButton] = useState("")
  return {
    isDescending,
    setIsDescending,
    mostRecentButton,
    setMostRecentButton,
  }
}

export const LobbyHeaderState = createContainer(useLobbyHeaderState)
