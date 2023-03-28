import { motion } from "framer-motion"
import { Price } from "../../../containers/Price"
import { formatDollars } from "../models/formatDollars"

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

  return (
    <div className="relative z-20 flex w-1/5 flex-col items-center justify-start text-xs text-stone-200">
      <motion.div
        layout="position"
        className={`${betHeaderStyle} color-shift mb-1 grid place-content-center rounded-b-lg border-b px-2 pt-1 font-bold`}
      >
        {status.toUpperCase()}
      </motion.div>
      <div className="total-bet-amount grid place-content-center rounded-md border px-1 text-base font-bold">
        {`$${formatDollars(Number(potSize) * avaxPrice)}`}
      </div>
    </div>
  )
}
