import { AnimatePresence, motion } from "framer-motion"
import { AuthState } from "../../../containers/AuthState"

export const SignInButton: React.FC = () => {
  const { signInWithGoogle, auth } = AuthState.useContainer()

  return (
    <AnimatePresence mode="wait">
      {!auth?.currentUser && (
        <div className="absolute right-11 z-40 mx-2 flex flex-col justify-center whitespace-nowrap">
          <motion.button
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              delay: 0.3,
              type: "just",
            }}
            id="header-sign-in-button"
            onClick={signInWithGoogle}
            className="color-shift clickable grid h-9 place-content-center rounded-md border border-stone-400 p-2 text-xs text-stone-800 hover:border-black hover:bg-stone-300 hover:text-black dark:border-stone-500 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-900 dark:hover:text-white sm:text-sm"
          >
            Sign in with Google
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}
