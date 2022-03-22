import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const usePrice = () => {
  const [avaxPrice, setAvaxPrice] = useState<number>(
    localStorage.getItem("avaxPrice") !== null
      ? parseFloat(localStorage.getItem("avaxPrice")!)
      : 0,
  )

  const getAvaxPrice = async (): Promise<number> => {
    return fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((data) => data["avalanche-2"].usd)
      .catch(console.error)
  }

  const priceFetch = () => {
    getAvaxPrice()
      .then((price) => {
        const tempPrice = price ?? localStorage.getItem("avaxPrice") ?? 0
        setAvaxPrice(tempPrice)
        localStorage.setItem("avaxPrice", tempPrice.toString())
      })
      .catch(console.error)
  }

  useEffect(() => {
    priceFetch()
    const interval = setInterval(priceFetch, 20000)
    return () => clearInterval(interval)
  }, [])
  return { avaxPrice }
}

export const Price = createContainer(usePrice)
