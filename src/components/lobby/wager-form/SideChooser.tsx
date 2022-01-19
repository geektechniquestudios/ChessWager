import { FaChessKing } from "react-icons/fa"

interface Props {
  betSide: string
  setBetSide: React.Dispatch<React.SetStateAction<string>>
}

export const SideChooser: React.FC<Props> = ({ betSide, setBetSide }) => {
  return (
    <div className="border-1">
      <div className="flex p-2 bg-secondary-dark justify-center">
        <label>Side</label>
        <div className="border-1 mx-2" />
        <button
          type="button"
          className={`${
            betSide === "White" ? "border-1" : ""
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
            betSide === "Black" ? "border-1" : ""
          }  rounded-full w-7 h-7 grid place-content-center mx-1 transform hover:scale-105 ease duration-100`}
          onClick={() => {
            setBetSide("Black")
          }}
        >
          <FaChessKing color="black" className="" />
        </button>
      </div>
      <div className="flex justify-evenly">{betSide}</div>
    </div>
  )
}
