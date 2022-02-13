import { Price } from "../../containers/Price"

export const AvaxPriceButton: React.FC = () => {
  const { avaxPrice } = Price.useContainer()

  return (
    <a
      href="https://www.coingecko.com/en/coins/avalanche"
      className="cw-button flex flex-col justify-center border-none my-2 hover:bg-stone-300 dark:hover:bg-stone-700 h-9"
    >
      <p
        style={{ textDecoration: "underline solid #9f1239 3px" }}
        className="m-1 underline"
        title="Price from CoinGecko"
        data-toggle="tooltip"
      >
        {`AVAX $${avaxPrice
          .toFixed(2)
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}
      </p>
    </a>
  )
}
