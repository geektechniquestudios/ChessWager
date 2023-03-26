import { BetsState } from "../../containers/BetsState"
import { IoIosAdd } from "react-icons/io"
import { motion, Variants } from "framer-motion"

interface Props {}

export const CreateWagerButton: React.FC<Props> = ({}) => {
  const { setShowWagerForm, showWagerForm } = BetsState.useContainer()

  const parentVariants: Variants = {
    variantA: {
      width: "2.5rem",
      borderRadius: "0.5rem",
      borderBottomRightRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
      borderTopLeftRadius: "0.5rem",
      top: 2,
      bottom: 2,
      left: showWagerForm ? -50 : 2,
      borderWidth: 1,
      transition: { type: "spring", bounce: 0.1 },
    },
    variantB: {
      width: "3rem",
      borderBottomRightRadius: "0rem",
      borderTopRightRadius: "0rem",
      borderTopLeftRadius: "0rem",
      top: 0,
      bottom: 0,
      left: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    variantC: {
      borderBottomRightRadius: "0rem",
      borderTopRightRadius: "0rem",
      borderTopLeftRadius: "0rem",
      width: "3.2rem",
      borderRadius: 0,
      top: 0,
      bottom: 0,
      left: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    variantD: {
      width: "2.6rem",
      borderRadius: "0.5rem",
      borderBottomRightRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
      borderTopLeftRadius: "0.5rem",
      top: 5,
      bottom: 5,
      left: -40,
      borderWidth: 1,
    },
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
      className="absolute z-50 flex items-center justify-center border-r border-stone-400 bg-stone-200 dark:border-stone-700 dark:bg-stone-900"
      onClick={() => {
        setShowWagerForm(true)
      }}
      title="Create Bet"
      initial="variantD"
      animate="variantA"
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
