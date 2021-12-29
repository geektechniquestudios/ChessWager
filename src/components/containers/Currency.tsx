import { createContainer } from "unstated-next"

const useCurrency = () => {
  const getAvaxPrice = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
    )
    const data = await response.json()
    return data.avax.usd
  }

  return { getAvaxPrice }
}

export const Currency = createContainer(useCurrency)
