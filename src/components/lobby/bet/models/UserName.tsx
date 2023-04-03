import { AnimatePresence, motion } from "framer-motion"

interface Props {
  displayName: string
  isUser1: boolean
}

export const UserName: React.FC<Props> = ({ displayName, isUser1 }) => {
  const justifyDirection = isUser1
    ? "justify-end pl-6 pr-9"
    : "justify-start pr-6 pl-9"

  return (
    <AnimatePresence>
      {displayName && displayName !== "" && (
        <motion.div
          initial={{ x: isUser1 ? -20 : 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isUser1 ? -20 : 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          layout="position"
          className={`${justifyDirection} flex w-2/5 shrink-0 items-center text-xs font-extrabold text-stone-900 dark:text-stone-100`}
        >
          <p className="user-name shrink overflow-hidden overflow-ellipsis whitespace-nowrap">
            {displayName}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
