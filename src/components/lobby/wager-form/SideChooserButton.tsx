import { FaChessKing } from "react-icons/fa"

interface Props {
  betSide: "white" | "black"
  setBetSide: React.Dispatch<React.SetStateAction<"white" | "black">>
  thisSide: "white" | "black"
}

export const SideChooserButton: React.FC<Props> = ({
  betSide,
  setBetSide,
  thisSide,
}) => {
  const isSelected = betSide === thisSide
  return (
    <button
      title={thisSide}
      type="button"
      className={`color-shift rounded-md w-8 h-8 grid place-content-center border ${
        thisSide === "black"
          ? "hover:bg-stone-400 dark:hover:bg-stone-500"
          : "hover:bg-stone-500 dark:hover:bg-stone-800"
      } ${
        isSelected
          ? ` ${
              thisSide === "black"
                ? "bg-stone-400 dark:bg-stone-500 border-stone-600 dark:border-stone-800  "
                : "bg-stone-500 dark:bg-stone-800 border-stone-200 dark:border-stone-500  "
            }`
          : "border-transparent"
      }
      `}
      onClick={() => {
        setBetSide(thisSide)
      }}
    >
      <FaChessKing
        className={thisSide === "white" ? "text-stone-100" : "text-black"}
        stroke={thisSide === "white" ? "black" : "white"}
        strokeWidth={8}
        size={20}
      />
    </button>
  )
}
