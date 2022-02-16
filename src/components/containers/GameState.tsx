import { useState } from "react"
import { createContainer } from "unstated-next"

const useGameState = () => {
  const [gameId, setGameId] = useState("")
  return { gameId, setGameId }
}

export const GameState = createContainer(useGameState)
