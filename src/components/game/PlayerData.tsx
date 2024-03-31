import { motion } from "framer-motion"
import { Countdown } from "./Countdown"

interface Props {
  title: string
  name: string
  time: number
  rating: number
  fen: string
  side: "white" | "black"
  isNewGame: boolean
  isTop: boolean
}

export const PlayerData: React.FC<Props> = ({
  title,
  name,
  time,
  rating,
  fen,
  side,
  isNewGame,
  isTop,
}) => {
  const topStyle = isTop ? "rounded-t-xl" : "rounded-b-xl"
  return (
    <div
      className={`${topStyle} z-10 flex w-full items-center justify-between overflow-clip`}
    >
      <motion.a
        layout
        transition={{
          type: "spring",
          mass: 0.4,
          bounce: 0.1,
          delay: isTop ? 0 : 0.15,
        }}
        href={`https://lichess.org/@/${name}`}
        rel="noreferrer noopener"
        target="_blank"
        className="color-shift mx-1.5 flex h-7 w-0 min-w-[1.75rem] max-w-min grow flex-col justify-center overflow-hidden rounded-full border border-stone-500 bg-white px-1 text-sm hover:border-black hover:bg-stone-200 hover:text-stone-900 dark:border-stone-400 dark:bg-stone-600 dark:text-stone-100 dark:hover:border-white dark:hover:bg-stone-500 dark:hover:text-white"
      >
        <motion.div
          className="flex items-center justify-start gap-1.5 px-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
        >
          {title && (
            <p className="font-bold text-emerald-700 dark:text-emerald-300">
              {title}
            </p>
          )}
          <p className="min-w-0 flex-1 shrink overflow-hidden overflow-ellipsis whitespace-nowrap">
            {name}
          </p>
          <p className="shrink-0 font-bold">{rating !== 0 ? rating : ""}</p>
        </motion.div>
      </motion.a>
      <Countdown fen={fen} side={side} time={time} isNewGame={isNewGame} />
    </div>
  )
}
