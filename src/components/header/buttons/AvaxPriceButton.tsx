import { motion } from "framer-motion"
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
        <motion.a
          initial={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: [0, 0, 1], translateY: 0 }}
          exit={{ opacity: 0, translateY: -30 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            type: "spring",
            stiffness: 40,
          }}
          href="https://www.coingecko.com/en/coins/avalanche"
          className="color-shift clickable grid h-9 place-content-center rounded-md border-none border-stone-800 font-bold text-stone-800 hover:border-black hover:bg-stone-300 hover:text-black dark:border-stone-300 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-700 dark:hover:text-white"
          title="Price from CoinGecko"
          data-toggle="tooltip"
          target="_blank"
          rel="noreferrer noopener"
          id="avax-price-button"
        >
          <p className="m-1 text-xs underline sm:text-sm">
            {`AVAX $${price
              ?.toFixed(2)
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
        </motion.a>
      )}
    </>
  )
}
