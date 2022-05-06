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
          className="h-9 rounded-md grid place-content-center color-shift clickable border-none hover:bg-stone-300 dark:hover:bg-stone-700 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white border-stone-800 dark:border-stone-300 text-stone-800 dark:text-stone-300 font-bold"
          title="Price from CoinGecko"
          data-toggle="tooltip"
          target="_blank"
          rel="noreferrer noopener"
          id="avax-price-button"
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
