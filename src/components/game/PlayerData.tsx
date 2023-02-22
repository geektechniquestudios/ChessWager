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
  return (
    <div
      className={`flex w-full justify-between overflow-clip ${
        isTop ? "rounded-t-lg" : "rounded-b-lg"
      } `}
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
        className="color-shift my-2 mx-1 flex h-7 min-w-[1.75rem] flex-col justify-center overflow-hidden rounded-full border border-stone-500 bg-stone-100 px-1 text-sm hover:border-black hover:bg-white hover:text-stone-900 dark:border-stone-400 dark:bg-stone-600 dark:text-stone-100 dark:hover:border-white dark:hover:bg-stone-500 dark:hover:text-white"
      >
        <motion.div
          className="mx-1.5 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
        >
          <p
            className={`${
              (title?.length ?? 0) > 0 ? "mr-1" : ""
            } flex font-bold text-emerald-700 dark:text-emerald-500`}
          >
            {title}
          </p>
          <div className="flex gap-2">
            <p>{name}</p>
            <p className="font-bold">{rating !== 0 ? rating : ""}</p>
          </div>
        </motion.div>
      </motion.a>
      <Countdown fen={fen} side={side} time={time} isNewGame={isNewGame} />
    </div>
  )
}
