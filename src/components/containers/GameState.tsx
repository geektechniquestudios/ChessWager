import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const useGameState = () => {
  const [gameId, setGameId] = useState("")
  const [prevGameId, setPrevGameId] = useState("")
  useEffect(() => {
    setPrevGameId(gameId)
  }, [gameId])
  return { gameId, setGameId, prevGameId }
}

export const GameState = createContainer(useGameState)
