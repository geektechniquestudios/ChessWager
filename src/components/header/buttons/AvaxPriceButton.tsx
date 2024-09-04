import { motion } from "framer-motion"
import { PriceState } from "../../../containers/PriceState"

export const AvaxPriceButton: React.FC = () => {
  const { avaxPrice } = PriceState.useContainer()

  return (
    <motion.a
      initial={{ opacity: 0, translateY: -30 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -30 }}
      transition={{
        delay: 0.1,
        type: "spring",
        mass: 0.7,
        bounce: 0,
        stiffness: 80,
      }}
      href="https://www.coingecko.com/en/coins/avalanche"
      className="color-shift clickable grid h-9 place-content-center rounded-md border-none border-stone-800 px-1 text-center font-bold text-stone-800 hover:border-black hover:bg-stone-300 hover:text-black dark:border-stone-300 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-700 dark:hover:text-white"
      title="Price from CoinGecko"
      data-toggle="tooltip"
      target="_blank"
      rel="noreferrer noopener"
      id="avax-price-button"
    >
      <p className="m-1 text-xs sm:text-sm">
        {`AVAX $${avaxPrice
          ?.toFixed(2)
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}
      </p>
    </motion.a>
  )
}
