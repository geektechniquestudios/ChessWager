import { AnimatePresence, motion } from "framer-motion"
import { WindowSize } from "../containers/WindowSize"
import { AvaxPriceButton } from "./buttons/AvaxPriceButton"
import { LichessButton } from "./buttons/LichessButton"

export const HeaderLeft: React.FC = () => {
  const { width } = WindowSize.useContainer()
  return (
    <>
      {width > 370 && (
        <motion.div
          className="ml-3 mr-1.5 flex h-full w-1/4 shrink-0 items-center justify-start gap-1.5"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AvaxPriceButton />
          <LichessButton />
        </motion.div>
      )}
    </>
  )
}
