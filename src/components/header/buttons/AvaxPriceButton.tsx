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
          className="color-shift clickable grid h-9 place-content-center rounded-md border-none border-stone-800 font-bold text-stone-800 hover:border-black hover:bg-stone-300 hover:text-black dark:border-stone-300 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-700 dark:hover:text-white"
          title="Price from CoinGecko"
          data-toggle="tooltip"
          target="_blank"
          rel="noreferrer noopener"
          id="avax-price-button"
        >
          <p
            style={{ textDecoration: "underline solid #9f1239 3px" }}
            className="m-1 underline text-xs sm:text-sm"
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
