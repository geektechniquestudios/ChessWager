import { useEffect } from "react"

interface Props {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}

export const PopupCounter: React.FC<Props> = ({ count, setCount }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [count])
  return <p className="text-xs">Closing in {count}...</p>
}
