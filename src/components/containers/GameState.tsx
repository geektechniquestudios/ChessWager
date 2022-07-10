import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"
import { GameData } from "../../interfaces/GameData"

const useGameState = () => {
  const [gameId, setGameId] = useState("")
  const [prevGameId, setPrevGameId] = useState("")
  useEffect(() => {
    if (gameId !== prevGameId) setPrevGameId(gameId)
  }, [gameId])

  const buildOutcomeMessage = (gameData: GameData): string => {
    const whiteWins = gameData.winner === "white" ? "White won" : ""
    const blackWins = gameData.winner === "black" ? "Black won" : ""
    const isDraw = gameData.status === "draw" || (!whiteWins && !blackWins)
    const draw = isDraw ? "Game ended in a draw" : ""
    const isStalemate = gameData.status === "stalemate"
    const stalemate = isStalemate ? "by stalemate" : ""
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
