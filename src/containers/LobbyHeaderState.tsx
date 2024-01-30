import { useState } from "react"
import { createContainer } from "unstated-next"
import { useLocalStorage } from "../hooks/useLocalStorage"

const useLobbyHeaderState = () => {
  const [isDescending, setIsDescending] = useState(true)
  const [mostRecentButton, setMostRecentButton] = useState("")
  const [isRealtime, setIsRealtime] = useLocalStorage<boolean>(
    "isRealtime",
    true,
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
