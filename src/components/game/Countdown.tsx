import { useEffect, useState } from "react"

interface Props {
  fen: string
  side: string
  time: number
}

export const Countdown: React.FC<Props> = ({ fen, side, time }) => {
  const [count, setCount] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)

  const prependZeros = (num: number): string => {
    return num < 10 ? "0" + String(num) : String(num)
  }

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
    if (fen.slice(-1) === side.slice(0, 1)) {
      setIsPlayerTurn(true)
      const interval = setInterval(() => {
        setCount(count + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
    else {
      setIsPlayerTurn(false)
    }
    return
  })

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

  const backlight = isPlayerTurn ? "bg-green-700" : ""

  return (
    <div className={`${backlight} border p-1`}>
      {formatTime(secondsToShow(time - count - 1))}
    </div>
  )
}
