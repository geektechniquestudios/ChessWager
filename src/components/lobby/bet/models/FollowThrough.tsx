import { motion } from "framer-motion"

interface Props {
  followThrough: number[]
  hasUserPaid: boolean
  isUser1: boolean
}

export const FollowThrough: React.FC<Props> = ({
  followThrough,
  hasUserPaid,
  isUser1,
}) => {
  const colorStyle = hasUserPaid
    ? "follow-through-funded"
    : "follow-through-not-funded"
  const userStyle = isUser1 ? "-left-0.5" : "-right-0.5"
  const largeStyle =
    followThrough[1] > 10000 ? "px-0.5 text-[0.6rem]" : "px-1 text-[0.75rem]"

  const formatFollowThrough = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m"
    } else if (num >= 100000) {
      return (num / 1000).toFixed(0).replace(/\.0$/, "") + "k"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
    } else {
      return num.toFixed(0)
    }
  }

  return (
    <motion.div
      initial={{ y: 8, x: 10, rotate: 40, opacity: 0 }}
      animate={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
      exit={isUser1 ? {} : { y: 8, x: 10, rotate: 50, opacity: 0 }}
      transition={{ type: "spring", duration: 0.3 }}
      title="Trust"
      className={`${colorStyle} ${userStyle} ${largeStyle} follow-through color-shift absolute -bottom-[0.55rem] flex h-4 items-center justify-center rounded-md border font-bold`}
    >
      {formatFollowThrough(followThrough[0])}/
      {formatFollowThrough(followThrough[1])}
    </motion.div>
  )
}
