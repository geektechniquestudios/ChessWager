import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"
import { ChatToggle } from "./ChatToggle"

const useWindowSize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [prevWidth, setPrevWidth] = useState(width)
  const { setShowChat } = ChatToggle.useContainer()

  const handleWindowSizeChange = () => {
    if (prevWidth >= 641 && width < 641) setShowChat(false)
    else if (
      prevWidth < 641 &&
      width >= 641 &&
      localStorage.getItem("showChat") === "true"
    )
      setShowChat(true)
    setPrevWidth(width)
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [width])

  return { width }
}

export const WindowSize = createContainer(useWindowSize)
