import { useState } from "react"
import { createContainer } from "unstated-next"

const useLobbyState = () => {
  const [dummy, setDummy] = useState(true)
  return { dummy, setDummy }
}

export const LobbyState = createContainer(useLobbyState)
