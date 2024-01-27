import { createContainer } from "unstated-next"
import { useLocalStorage } from "../../hooks/useLocalStorage"


const useDarkMode = () => {
  const [isDarkOn, setIsDarkOn] = useLocalStorage<boolean>("darkMode", true)
  return { isDarkOn, setIsDarkOn }
}

export const DarkMode = createContainer(useDarkMode)
