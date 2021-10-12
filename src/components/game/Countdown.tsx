import React, { useEffect, useState } from "react"

interface Props {
  fen: string
  side: string
  time: number
}

const Countdown: React.FC<Props> = ({ fen, side, time }) => {
  const [count, setCount] = useState(0)

  const prependZeros = (num: number): string => {
    return num < 10 ? "0" + String(num) : String(num)
  }

  const formatTime = (inSeconds: number): string => {
    const hours = Math.floor(inSeconds / 3600)
    const minutes = Math.floor((inSeconds % 3600) / 60)
    const outSeconds = inSeconds % 60

    return (
      prependZeros(hours) +
      ":" +
      prependZeros(minutes) +
      ":" +
      prependZeros(outSeconds)
    )
  }

  useEffect(() => {
    if (fen.slice(-1) === side.slice(0, 1)) {
      const interval = setInterval(() => {
        setCount(count + 1)
      }, 1000)
      return () => clearInterval(interval)
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

  return <>{formatTime(secondsToShow(time - count - 1))}</>
}

export default Countdown
