import { AnimatePresence, motion } from "framer-motion"
import { Auth } from "../../containers/Auth"

export const SignInButton: React.FC = () => {
  const { signInWithGoogle, user } = Auth.useContainer()

  return (
    <>
      <AnimatePresence mode="wait">
        {!user && (
          <div className="mx-2 flex flex-col justify-center absolute right-11">
            <motion.button
              initial={{ opacity: 0, translateY: -30 }}
              animate={{ opacity: [0, 0, 1], translateY: 0 }}
              exit={{ opacity: 0, translateY: -30 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                type: "spring",
                stiffness: 40,
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
    </>
  )
}
