import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const usePrice = () => {
  const [avaxPrice, setAvaxPrice] = useState<number>(
    localStorage.getItem("avaxPrice")
      ? parseFloat(localStorage.getItem("avaxPrice") as string)
      : 0,
  )

  const fetchAvaxPrice = async (): Promise<number | null> => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
      )
      const data = await response.json()
      return data["avalanche-2"].usd
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const updateAvaxPrice = async () => {
    const fetchedPrice = await fetchAvaxPrice()
    const newPrice =
      fetchedPrice ??
      parseFloat(localStorage.getItem("avaxPrice") as string) ??
      0
    setAvaxPrice(newPrice)
    localStorage.setItem("avaxPrice", newPrice.toString())
  }

  useEffect(() => {
    updateAvaxPrice()
    const interval = setInterval(updateAvaxPrice, 45000)
    return () => clearInterval(interval)
  }, [])

  return { avaxPrice }
}

export const Price = createContainer(usePrice)
