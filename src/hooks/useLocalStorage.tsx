import { useState } from "react"

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
  transformFunction?: (value: T) => T,
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      let value: T = initialValue

      if (item !== null) {
        try {
          value = JSON.parse(item) as T
        } catch (parseError) {
          console.error("Error parsing JSON from localStorage:", parseError)
          value = initialValue
        }
      }

      return transformFunction ? transformFunction(value) : value
    } catch (error) {
      console.error("Error in useLocalStorage:", error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error("Error in useLocalStorage setValue:", error)
    }
  }

  return [storedValue, setValue]
}
