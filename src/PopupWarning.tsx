import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoMdPause, IoMdPlay, IoMdClose } from "react-icons/io"
import { default as scammer } from "/src/assets/scammer.png"
import { useLocalStorage } from "./hooks/useLocalStorage"

export const PopupWarning: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true)
  const [count, setCount] = useState(8)
  const [paused, setPaused] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [dontShowAgain, setDontShowAgain] = useLocalStorage<boolean>(
    "dontShowAgain",
    false,
  )

  useEffect(() => {
    setIsInitialLoad(false)
    if (count <= 0 || dontShowAgain) {
      setShowPopup(false)
      return
    }
    if (!paused) {
      const interval: ReturnType<typeof setInterval> = setInterval(() => {
        setCount((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [count, paused])

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="scrollbar absolute left-1/2 top-1/2 z-[51] flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-evenly overflow-auto border-stone-300 bg-stone-100 bg-opacity-70 p-2 pt-6 shadow-lg backdrop-blur-md dark:border-stone-700 dark:bg-stone-800 dark:bg-opacity-90 sm:h-5/6 sm:w-3/4 sm:rounded-3xl sm:border-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.7,
            delay: isInitialLoad ? 0.5 : 0,
          }}
        >
          <div className="absolute -z-50 h-60 w-60 rounded-full bg-red-600 opacity-50 blur-2xl" />
          <header className="absolute right-1 top-1 flex items-center justify-center gap-2 rounded-full border border-stone-400 bg-stone-200 px-1 py-1 text-stone-800 dark:border-stone-500 dark:bg-stone-700 dark:text-stone-300">
            <p className="mx-2 text-xs font-medium">Closing in {count}...</p>
            <div className="flex gap-1">
              <button
                onClick={() => setPaused(!paused)}
                className="color-shift rounded-full p-1.5 text-stone-800 hover:bg-white focus:outline-none dark:text-stone-300 dark:hover:bg-stone-500"
              >
                {paused ? <IoMdPlay /> : <IoMdPause />}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="color-shift rounded-full p-1.5 text-stone-800 hover:bg-white focus:outline-none dark:text-stone-300 dark:hover:bg-stone-500"
              >
                <IoMdClose />
              </button>
            </div>
          </header>

          <div className="p-4 text-center">
            <div className="text-xl font-bold text-stone-900 dark:text-stone-100">
              This GitHub user is plagiarizing our work!
            </div>
          </div>

          <a
            href="https://github.com/synaptik69"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img
              src={scammer}
              alt="Scammer evidence"
              className="h-60 rounded-lg border-2 border-red-600 dark:border-red-500"
            />
          </a>

          <div className="max-w-96 rounded-md border border-stone-300 bg-stone-200 p-2 text-xs text-stone-900 dark:border-stone-400 dark:bg-stone-600 dark:text-stone-100">
            <a
              href="https://github.com/synaptik69"
              className="float-left mr-0.5 font-bold text-blue-600 hover:underline dark:text-blue-400"
              rel="noreferrer noopener"
              target="_blank"
            >
              Synaptik69
            </a>
            <p>
              has reuploaded a repository containing our entire codebase without
              any attribution and replaced our commit signatures with their own.
              This action constitutes plagiarism and infringes upon our software
              copyright. Additionally, similar actions have been observed in
              their other projects. We have filed a DMCA takedown request, and
              this message will be removed once the issue is resolved.
            </p>
          </div>

          <div className="text-center text-stone-900 dark:text-stone-100">
            <p>
              ChessWager was created by
              <a
                href="https://github.com/geektechniquestudios"
                className="mx-1 font-bold text-blue-600 hover:underline dark:text-blue-400"
                rel="noreferrer noopener"
                target="_blank"
              >
                GeekTechniqueStudios
              </a>
              with significant contributions from
              <a
                href="https://github.com/spaceC00kie"
                className="ml-1 font-bold text-blue-600 hover:underline dark:text-blue-400"
                rel="noreferrer noopener"
                target="_blank"
              >
                SpaceC00kie
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="cw-button"
              onClick={() => {
                setDontShowAgain(true)
                setShowPopup(false)
              }}
            >
              Don't Show Again
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
