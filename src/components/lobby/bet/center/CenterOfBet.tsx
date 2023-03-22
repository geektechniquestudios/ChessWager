import { motion } from "framer-motion"
import { Price } from "../../../containers/Price"

interface Props {
  potSize: string
  status: "ready" | "pending" | "approved" | "funded"
  betHeaderStyle: string
}

export const CenterOfBet: React.FC<Props> = ({
  potSize,
  status,
  betHeaderStyle,
}) => {
  const { avaxPrice } = Price.useContainer()

  const formatDollars = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m"
    } else if (num >= 1000) {
      if (num < 10000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
      } else {
        return (num / 1000).toFixed(0) + "k"
      }
    } else if (num >= 100 && num < 1000) {
      return num.toFixed(0)
    } else {
      return num.toFixed(2)
    }
  }

  return (
    <div className="relative z-20 flex w-1/5 flex-col items-center justify-start text-xs text-stone-200">
      <motion.div
        layout="position"
        className={`${betHeaderStyle} color-shift mb-1 grid place-content-center rounded-b-lg border-b px-2 pt-1 font-bold`}
      >
        {status.toUpperCase()}
      </motion.div>
      <motion.div
        layout
        className="total-bet-amount grid place-content-center rounded-md border px-1 text-base font-bold"
      >
        {`$${formatDollars(Number(potSize) * avaxPrice)}`}
      </motion.div>
    </div>
  )
}
