import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const usePrice = () => {
  const [avaxPrice, setAvaxPrice] = useState<number>(0)
  const getAvaxPrice = async () => {
    return fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((data) => data["avalanche-2"].usd)
      .catch(console.error)
  }
  useEffect(() => {
    getAvaxPrice().then((price) => setAvaxPrice(price ?? 0))
    setInterval(() => {
      getAvaxPrice().then((price) => setAvaxPrice(price ?? 0))
    }, 10000)
  }, [])
  return { avaxPrice }
}

export const Price = createContainer(usePrice)
