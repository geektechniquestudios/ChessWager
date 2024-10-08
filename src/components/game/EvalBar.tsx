import { motion } from "framer-motion"
import { EvalMarkings } from "./EvalMarkings"
import { GameStreamState } from "../../containers/GameStreamState"

interface Props {
  orientation: "black" | "white"
  fen: string
}

export const EvalBar: React.FC<Props> = ({ orientation, fen }) => {
  const { score, mateIn, isAnalysisOn, setIsAnalysisOn, isCheckmate } =
    GameStreamState.useContainer()

  const getPercentFromScore = (score: number, fen: string): number => {
    if (!fen || !isAnalysisOn) return 50
    if (isCheckmate) return orientation[0] === fen.split(" ")[1] ? 0 : 100

    const clampedScore = Math.max(-1000, Math.min(score, 1000))
    const percent =
      mateIn === 0
        ? Math.max(2, Math.min(50 + (clampedScore * 49) / 1000, 98))
        : mateIn > 0
          ? 98
          : 2
    return orientation === "black" ? 100 - percent : percent
  }
  const percent = getPercentFromScore(score, fen)

  const shouldShowMateIn = (side: "white" | "black", mateIn: number): boolean =>
    isAnalysisOn &&
    ((side === "white" && mateIn > 0) ||
      (side === "black" && mateIn < 0) ||
      isCheckmate)

  const orientationStyle = (
    orientation: "white" | "black",
    side: "top" | "bottom",
  ) => {
    const isTop = side === "top"
    const isBlack = orientation === "white"
    const black =
      "bg-stone-800 dark:bg-stone-900 text-stone-100 dark:text-stone-200"
    const white =
      "bg-stone-100 dark:bg-stone-200 text-stone-900 dark:text-stone-950"
    return isTop ? (isBlack ? black : white) : isBlack ? white : black
  }

  const roundedStyle = percent === 0 || percent === 100 ? "rounded-full" : ""
  const commonBarStyle = `${roundedStyle} color-shift border-stone-600 dark:border-stone-500 flex flex-col-reverse items-center dark:border-stone-500`
  const topBarStyle = `${orientationStyle(
    orientation,
    "top",
  )} ${commonBarStyle} rounded-t-full justify-start`
  const bottomBarStyle = `${orientationStyle(
    orientation,
    "bottom",
  )} ${commonBarStyle} rounded-b-full justify-end`

  return (
    <motion.div
      className="relative flex h-full w-5 shrink-0 cursor-pointer flex-col justify-center overflow-clip rounded-full border border-stone-600 object-contain p-0 text-xs font-bold dark:border-stone-500"
      initial={{ opacity: 1 }}
      animate={{ opacity: isAnalysisOn ? 1 : 0.5 }}
      whileHover={{ opacity: isAnalysisOn ? 1 : 0.6 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        setIsAnalysisOn((prev) => !prev)
      }}
    >
      <EvalMarkings />
      <motion.div
        className={topBarStyle}
        initial={{ height: "50%" }}
        animate={{
          height: `${100 - percent}%`,
          opacity: percent === 100 ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid w-4 grow-0 place-content-center">
          {shouldShowMateIn(
            orientation === "white" ? "black" : "white",
            mateIn,
          ) && (
            <div className="flex">
              <div style={{ fontSize: "0.5rem" }}>#</div>
              <>{mateIn !== 0 && Math.abs(mateIn)}</>
            </div>
          )}
        </div>
      </motion.div>
      <div className="absolute h-0.5 w-full place-content-center border border-stone-600 bg-stone-500 mix-blend-exclusion dark:border-stone-500 dark:bg-stone-400" />
      <motion.div
        className={bottomBarStyle}
        initial={{ height: "50%" }}
        animate={{
          height: `${percent}%`,
          opacity: percent === 0 ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid w-4 grow-0 place-content-center">
          {shouldShowMateIn(orientation, mateIn) && (
            <div className="flex">
              <div style={{ fontSize: "0.5rem" }}>#</div>
              <>{mateIn !== 0 && Math.abs(mateIn)}</>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
