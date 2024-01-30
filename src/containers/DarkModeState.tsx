import { createContainer } from "unstated-next"
import { useLocalStorage } from "../hooks/useLocalStorage"

const useDarkModeState = () => {
  const [isDarkOn, setIsDarkOn] = useLocalStorage<boolean>("darkMode", true)
  return { isDarkOn, setIsDarkOn }
}

export const DarkModeState = createContainer(useDarkModeState)
