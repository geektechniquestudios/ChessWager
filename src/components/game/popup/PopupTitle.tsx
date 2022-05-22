import { FaChessKing } from "react-icons/fa"

interface Props {
  playerName: string
  playerRating: number
  color: "white" | "black"
}

export const PopupTitle: React.FC<Props> = ({
  playerName,
  playerRating,
  color,
}) => {
  return (
    <a
      href={`https://lichess.org/@/${playerName}`}
      rel="noreferrer"
      className="color-shift flex w-full items-center justify-between gap-2 rounded-md border border-stone-400 bg-stone-100 p-2 text-stone-900 hover:bg-white dark:border-stone-500 dark:bg-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-stone-200 "
      target="_blank"
    >
      <p className="font-bold">{playerRating}</p>
      <p className="overflow-hidden text-sm">{playerName}</p>
      <div className="m-1 h-full w-4">
        <FaChessKing
          className={color === "white" ? "text-stone-100" : "text-black"}
          stroke={color === "white" ? "black" : "white"}
          strokeWidth={8}
          size={20}
        />
      </div>
    </a>
  )
}
