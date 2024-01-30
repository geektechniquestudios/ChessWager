import { useEffect, useState } from "react"
import { AuthState } from "../../../../../containers/AuthState"
import { GameState } from "../../../../../containers/GameState"
import { GameData } from "../../../../../interfaces/GameData"
import { Bet } from "../../../../../interfaces/Bet"
import { DarkModeState } from "../../../../../containers/DarkModeState"

interface Props {
  bet: Bet
}

export const BetOutcomeTile: React.FC<Props> = ({ bet }) => {
  const { id, betSide, user1Id, gameId } = bet ?? {}
  const [outcome, setOutcome] = useState<string>("")
  const { buildOutcomeMessage } = GameState.useContainer()
  const { user } = AuthState.useContainer()

  const isUser1 = user?.uid === user1Id

  const isOnWinningSide = isUser1
    ? (betSide === "white" && outcome.startsWith("White won")) ||
      (betSide === "black" && outcome.startsWith("Black won"))
    : (betSide === "white" && outcome.startsWith("Black won")) ||
      (betSide === "black" && outcome.startsWith("White won"))

  const { isDarkOn } = DarkModeState.useContainer()
  const resultStyle =
    outcome === "Game ended in a draw" || outcome === "Game in progress"
      ? ""
      : isOnWinningSide
        ? isDarkOn
          ? "text-green-300"
          : "text-green-800"
        : isDarkOn
          ? "text-red-300"
          : "text-red-800"

  useEffect(() => {
    setOutcome("")
    if (!gameId) return
    fetch(`https://lichess.org/api/game/${gameId}`)
      .then((res) => res.json())
      .then((gameData: GameData) => {
        setOutcome(buildOutcomeMessage(gameData) ?? "")
      })
      .catch(console.error)
  }, [id, gameId])

  const animateStyle = outcome === "" ? "animate-pulse" : ""

  return (
    <div className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-stone-400 bg-white p-2 dark:border-stone-500 dark:bg-stone-600">
      <p
        className={`${resultStyle} ${animateStyle} text-center text-sm font-bold `}
      >
        {outcome}
      </p>
    </div>
  )
}
