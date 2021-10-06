import React, { useEffect, useRef, useState } from "react"

interface Props {
  fen: string
  side: string
  time: number
}

const Countdown: React.FC<Props> = ({ fen, side, time }) => {
  const [count, setCount] = useState(0)

  const prependZeros = (num: number): string => {
    if (num < 10) {
      return "0" + String(num)
    } else {return String(num)}
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

  useEffect(() => { // hacky, interval should restart every time [time] changes
    const interval = setInterval(() => {
      if (fen.slice(-1) === side.slice(0, 1) && time > 0) {
        setCount(count + 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  })

  useEffect(() => {
    setCount(0)
  }, [time])

  return <>{formatTime(time - count - 1)}</>
}

export default Countdown
