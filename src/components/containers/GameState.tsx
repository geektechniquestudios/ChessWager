import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const useGameState = () => {
  const [gameId, setGameId] = useState("")
  const [prevGameId, setPrevGameId] = useState("")
  useEffect(() => {
    setPrevGameId(gameId)
  }, [gameId])

  const buildOutcomeMessage = (gameData: any): string => {
    const whiteWins = gameData.winner === "white" ? "White won" : ""
    const blackWins = gameData.winner === "black" ? "Black won" : ""
    const isDraw = gameData.status === "draw" || (!whiteWins && !blackWins)
    const draw = isDraw ? "Game ended in a draw" : ""
    const isStalemate = gameData.status === "Game ended in a stalemate"
    const stalemate = isStalemate ? "Stalemate" : ""
    const resign = gameData.status === "resign" ? "resignation" : ""
    const timeout =
      gameData.status === "timeout" || gameData.status === "outoftime"
        ? "by timeout"
        : ""
    const checkmate = gameData.status === "mate" ? "by checkmate" : ""

    const outcome =
      isDraw || isStalemate
        ? `${draw}${stalemate}`
        : `${whiteWins}${blackWins} ${resign}${timeout}${checkmate}`

    return outcome
  }

  return { gameId, setGameId, prevGameId, buildOutcomeMessage }
}

export const GameState = createContainer(useGameState)
