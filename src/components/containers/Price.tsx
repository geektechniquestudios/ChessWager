import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

const usePrice = () => {
  const [avaxPrice, setAvaxPrice] = useState<number>(
    localStorage.getItem("avaxPrice") !== null
      ? parseFloat(localStorage.getItem("avaxPrice")!)
      : 0,
  )
  const getAvaxPrice = async () => {
    return fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((data) => data["avalanche-2"].usd)
      .catch(() => localStorage.getItem("avaxPrice"))
  }
  useEffect(() => {
    getAvaxPrice().then((price) => {
      setAvaxPrice(price ?? localStorage.getItem("avaxPrice") ?? 0)
      localStorage.setItem("avaxPrice", price.toString())
    })
    setInterval(() => {
      getAvaxPrice().then((price) => {
        setAvaxPrice(price ?? localStorage.getItem("avaxPrice") ?? 0)
        localStorage.setItem("avaxPrice", price.toString())
      })
    }, 10000)
  }, [])
  return { avaxPrice }
}

export const Price = createContainer(usePrice)
