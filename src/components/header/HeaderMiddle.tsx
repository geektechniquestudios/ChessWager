import { DropdownState } from "../containers/DropdownState"
import { UserDataState } from "../containers/UserDataState"
import { AnimatePresence, motion } from "framer-motion"

interface Props {}

export const HeaderMiddle: React.FC<Props> = ({}) => {
  const { userData } = UserDataState.useContainer()
  const { openDropdownToMenu } = DropdownState.useContainer()

  return (
    <div className="w-1/3 flex-auto shrink" id="header-middle">
      <div className="flex justify-center">
        {!(userData?.hasFirstBetBeenPlaced ?? true) && (
          <AnimatePresence>
            <motion.button
              onClick={() => {
                openDropdownToMenu("howToPlay")
              }}
              className="color-shift clickable animate-pulse rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 40 }}
            >
              Make your first bet
            </motion.button>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
