import { BetsState } from "../../containers/BetsState"
import { IoIosAdd } from "react-icons/io"
import { motion, Variants } from "framer-motion"

interface Props {}

export const CreateWagerButton: React.FC<Props> = ({}) => {
  const { setShowWagerForm } = BetsState.useContainer()

  const parentVariants: Variants = {
    variantA: { width: "2.6rem" },
    variantB: { width: "3.1rem" },
    variantC: { width: "3.2rem" },
  }

  const childVariants: Variants = {
    variantA: { scale: 1, rotate: 0 },
    variantB: {
      scale: 1.15,
      rotate: 90,
    },
    variantC: { scale: 0.99 },
  }

  return (
    <motion.button
      layout="position"
      className="absolute left-0 top-0 bottom-0 flex items-center justify-center rounded-bl-lg border-r border-stone-400 bg-stone-200 dark:border-stone-700 dark:bg-stone-900"
      onClick={() => {
        setShowWagerForm(true)
      }}
      title="Create Bet"
      initial="variantA"
      whileHover="variantB"
      whileTap="variantC"
      variants={parentVariants}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="color-shift rounded-full p-1 text-stone-900  dark:border-stone-400  dark:text-stone-50"
        whileTap={{
          scale: 0.99,
        }}
        variants={childVariants}
        transition={{ type: "spring", mass: 0.6, bounce: 0.7 }}
      >
        <IoIosAdd size="22" />
      </motion.div>
    </motion.button>
  )
}
