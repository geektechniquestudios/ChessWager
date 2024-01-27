import { useEffect, useState } from "react"
import { GameStream } from "../containers/GameStream"

interface Props {
  fen: string
  side: "white" | "black"
  time: number
  isNewGame: boolean
}

export const Countdown: React.FC<Props> = ({ fen, side, time, isNewGame }) => {
  const [count, setCount] = useState(0)

  const { isCheckmate, shouldShowHours } = GameStream.useContainer()

  const formatTime = (inSeconds: number): string => {
    const prependZeros = (num: number): string =>
      num < 10 ? "0" + String(num) : String(num)

    const hours = Math.floor(inSeconds / 3600)
    const minutes = Math.floor((inSeconds % 3600) / 60)
    const outSeconds = inSeconds % 60

    return shouldShowHours
      ? hours + ":" + prependZeros(minutes) + ":" + prependZeros(outSeconds)
      : prependZeros(minutes) + ":" + prependZeros(outSeconds)
  }

  const getIsPlayerTurn = (fen: string, side: "white" | "black") => {
    const sideThatMovedLast = fen.split(" ")[1]
    const sideBeingRendered = side.slice(0, 1)
    return sideThatMovedLast === sideBeingRendered
  }

  const isPlayerTurn = getIsPlayerTurn(fen, side)

  const decrementClock = () => {
    if (isCheckmate || !isPlayerTurn) return

    const interval = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }

  useEffect(decrementClock, [fen, side, count])

  useEffect(() => {
    setCount(0)
  }, [time])

  const seconds = Math.max(0, time - count - 1)

  const buildStyles = () => {
    const lowTime = seconds < 20
    const veryLowTime = seconds < 3
    const bgColor =
      isPlayerTurn && !lowTime && !isNewGame
        ? "bg-teal-50 dark:bg-green-800"
        : ""
    const lowTimeColor =
      isPlayerTurn && lowTime && !veryLowTime && !isNewGame
        ? "bg-rose-50 dark:bg-amber-600"
        : ""
    const veryLowTimeColor =
      isPlayerTurn && veryLowTime && !isNewGame
        ? "bg-red-200 dark:bg-red-800"
        : ""
    const baseColor = isPlayerTurn ? "" : "bg-stone-300 dark:bg-stone-600"
    const newGameStyle = isNewGame ? "animate-pulse" : ""
    const width = shouldShowHours ? "w-26" : "w-20"
    return `${bgColor} ${lowTimeColor} ${veryLowTimeColor} ${newGameStyle} ${baseColor} ${width}`
  }

  const clock = isNewGame ? "??:??" : formatTime(seconds)

  return (
    <div
      className={`${buildStyles()} color-shift -z-50 flex items-center justify-center border-l border-stone-900 p-1.5 text-2xl text-stone-900 dark:text-stone-200`}
    >
      {clock}
    </div>
  )
}
