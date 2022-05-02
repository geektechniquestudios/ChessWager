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
      className="flex justify-between p-2 rounded-md items-center gap-2 w-full hover:bg-white bg-stone-100 dark:bg-stone-700 dark:hover:bg-stone-800 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift border border-stone-400 dark:border-stone-500 "
      target="_blank"
    >
      <p className="font-bold">{playerRating}</p>
      <p className="overflow-hidden text-sm">{playerName}</p>
      <div className="w-4 h-full m-1">
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
