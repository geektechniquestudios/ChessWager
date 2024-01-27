import { useEffect } from "react"
import { createContainer } from "unstated-next"
import { useLocalStorage } from "../../hooks/useLocalStorage"

const usePrice = () => {
  const [avaxPrice, setAvaxPrice] = useLocalStorage<number>("avaxPrice", 0)

  const fetchAvaxPrice = async (): Promise<number | null> => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
      )
      const data = await response.json()
      return data["avalanche-2"].usd
    } catch (error) {
      return null
    }
  }

  const updateAvaxPrice = async () => {
    const fetchedPrice = await fetchAvaxPrice()
    const newPrice = fetchedPrice ?? avaxPrice
    setAvaxPrice(newPrice)
  }

  useEffect(() => {
    updateAvaxPrice()
    const interval = setInterval(updateAvaxPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  return { avaxPrice }
}

export const Price = createContainer(usePrice)
