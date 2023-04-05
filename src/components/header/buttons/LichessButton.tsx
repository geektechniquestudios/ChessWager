import { motion } from "framer-motion"
import { SiLichess } from "react-icons/si"

interface Props {}

export const LichessButton: React.FC<Props> = ({}) => {
  return (
    <motion.a
      initial={{ opacity: 0, translateY: -30 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -30 }}
      transition={{
        delay: 0.3,
        type: "spring",
        mass: 0.7,
        bounce: 0,
        stiffness: 120,
      }}
      id="lichess-button"
      href="https://lichess.org/tv"
      className="color-shift clickable grid h-9 w-9 shrink-0 place-content-center rounded-md border-none border-stone-800 text-stone-800 hover:border-black hover:bg-stone-300 hover:text-black dark:border-stone-300 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-700 dark:hover:text-white"
      title="Watch on Lichess"
      data-toggle="tooltip"
      target="_blank"
      rel="noreferrer noopener"
    >
      <SiLichess
        size="18"
        title="Watch on Lichess"
        className="overflow-visible"
      />
    </motion.a>
  )
}
