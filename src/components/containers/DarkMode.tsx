import { useState } from "react"
import { createContainer } from "unstated-next"

const useDarkMode = () => {
  const [isDarkOn, setIsDarkOn] = useState(
    localStorage.getItem("darkMode") === "true" ||
      localStorage.getItem("darkMode") === "false"
      ? JSON.parse(localStorage.getItem("darkMode")!)
      : true,
  )
  return { isDarkOn, setIsDarkOn }
}

export const DarkMode = createContainer(useDarkMode)
