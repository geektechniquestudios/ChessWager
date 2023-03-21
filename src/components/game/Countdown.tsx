import { useEffect, useState } from "react"

interface Props {
  fen: string
  side: "white" | "black"
  time: number
  isNewGame: boolean
}

export const Countdown: React.FC<Props> = ({ fen, side, time, isNewGame }) => {
  const [count, setCount] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)

  const prependZeros = (num: number): string =>
    num < 10 ? "0" + String(num) : String(num)

  const formatTime = (inSeconds: number): string => {
    const hours = Math.floor(inSeconds / 3600)
    const minutes = Math.floor((inSeconds % 3600) / 60)
    const outSeconds = inSeconds % 60

    return hours > 0
      ? prependZeros(hours) + ":"
      : "" + prependZeros(minutes) + ":" + prependZeros(outSeconds)
  }

  useEffect(() => {
    // (side from game stream) === (side being displayed) ie: if it is the player's turn
    if (fen.split(" ")[1] === side.slice(0, 1)) {
      setIsPlayerTurn(true)
      const interval = setInterval(() => {
        setCount(count + 1)
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    } else {
      setIsPlayerTurn(false)
    }
    return
  }, [fen, side, count])

  useEffect(() => {
    setCount(0)
  }, [time])

  const secondsToShow = (num: number) => {
    if (num < 0) {
      return 0
    } else {
      return num
    }
  }

  const buildStyles = () => {
    const lowTime = secondsToShow(time - count - 1) < 20
    const veryLowTime = secondsToShow(time - count - 1) < 3
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
    return `${bgColor} ${lowTimeColor} ${veryLowTimeColor} ${newGameStyle} ${baseColor}`
  }

  return (
    <div
      className={`${buildStyles()} flex w-20 justify-center border-l border-stone-900 p-1.5 text-2xl text-stone-900 dark:text-stone-200`}
    >
      {!isNewGame ? formatTime(secondsToShow(time - count - 1)) : "??:??"}
    </div>
  )
}
