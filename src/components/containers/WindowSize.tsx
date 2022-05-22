import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const useWindowSize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [width, height])

  return { width, height }
}

export const WindowSize = createContainer(useWindowSize)
