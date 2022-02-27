import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const usePrice = () => {
  const getAvaxPrice = async () => {
    return fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((data) => data["avalanche-2"].usd)
      .catch(console.error)
  }
  const [avaxPrice, setAvaxPrice] = useState(0)
  useEffect(() => {
    getAvaxPrice().then(setAvaxPrice)
    setInterval(() => {
      getAvaxPrice().then(setAvaxPrice)
    }, 10000)
  }, [])
  return { avaxPrice }
}

export const Price = createContainer(usePrice)
