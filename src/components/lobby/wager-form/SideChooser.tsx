import { FaChessKing } from "react-icons/fa"

interface Props {
  betSide: string
  setBetSide: React.Dispatch<React.SetStateAction<string>>
}

export const SideChooser: React.FC<Props> = ({ betSide, setBetSide }) => {
  return (
    <div className="border-1 border-stone-900 dark:border-stone-500">
      <div className="flex p-2 justify-center bg-stone-300 dark:bg-stone-700">
        <p className="text-stone-900 dark:text-stone-300">Side</p>
        <div className="border-1 mx-2 border-stone-900 dark:border-stone-500" />
        <button
          type="button"
          className={`${
            betSide === "White"
              ? "border-1 border-stone-900 dark:border-stone-300"
              : ""
          }  rounded-full w-7 h-7 grid place-content-center mx-1 transform hover:scale-105 ease duration-100`}
          onClick={() => {
            setBetSide("White")
          }}
        >
          <FaChessKing color="white" className="" />
        </button>
        <button
          type="button"
          className={`${
            betSide === "Black"
              ? "border-1 border-stone-900 dark:border-stone-300"
              : ""
          }  rounded-full w-7 h-7 grid place-content-center mx-1 transform hover:scale-105 ease duration-100`}
          onClick={() => {
            setBetSide("Black")
          }}
        >
          <FaChessKing color="black" className="" />
        </button>
      </div>
      <p className="flex justify-center text-stone-900 dark:text-stone-300">{betSide}</p>
    </div>
  )
}
