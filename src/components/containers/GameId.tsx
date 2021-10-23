import { useState } from "react"
import { createContainer } from "unstated-next"

const useGameId = () => {
  const [gameId, setGameId] = useState("")
  return { gameId, setGameId }
}

export const GameId = createContainer(useGameId)
