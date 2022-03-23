import { Price } from "../../containers/Price"

export const AvaxPriceButton: React.FC = () => {
  const { avaxPrice } = Price.useContainer()

  const price =
    avaxPrice ?? localStorage.getItem("avaxPrice") !== null
      ? parseFloat(localStorage.getItem("avaxPrice")!)
      : 0

  return (
    <>
      {avaxPrice !== 0 && avaxPrice !== undefined && avaxPrice !== null && (
        <a
          href="https://www.coingecko.com/en/coins/avalanche"
          className="cw-button flex flex-col justify-center border-none my-2 hover:bg-stone-300 dark:hover:bg-stone-700 h-9"
          title="Price from CoinGecko"
          data-toggle="tooltip"
          target="_blank"
          rel="noreferrer"
        >
          <p
            style={{ textDecoration: "underline solid #9f1239 3px" }}
            className="m-1 underline"
          >
            {`AVAX $${price
              ?.toFixed(2)
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
        </a>
      )}
    </>
  )
}
