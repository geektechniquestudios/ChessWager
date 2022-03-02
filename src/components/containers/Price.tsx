import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const usePrice = () => {
  const [avaxPrice, setAvaxPrice] = useState<number>(0)
  const getAvaxPrice = async () => {
    return (
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
      )
        .then((res) => res.json())
        .then((data) => data["avalanche-2"].usd ?? 0)
        .catch(console.error) ?? 0
    )
  }
  useEffect(() => {
    getAvaxPrice().then(setAvaxPrice)
    setInterval(() => {
      getAvaxPrice().then(setAvaxPrice)
    }, 10000)
  }, [])
  return { avaxPrice }
}

export const Price = createContainer(usePrice)
