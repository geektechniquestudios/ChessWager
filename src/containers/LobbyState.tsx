import { useState } from "react"
import { createContainer } from "unstated-next"

const useLobbyState = () => {
  const [dummy, setDummy] = useState(true)
  const refreshLobby = () => {
    setDummy((prev) => !prev)
  }
  return { dummy, setDummy, refreshLobby }
}

export const LobbyState = createContainer(useLobbyState)
