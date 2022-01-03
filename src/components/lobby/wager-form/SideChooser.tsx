import { FaChessKing } from "react-icons/fa"

/* eslint-disable jsx-a11y/anchor-is-valid */
interface Props {
  betSide: string
  setBetSide: React.Dispatch<React.SetStateAction<string>>
}

export const SideChooser: React.FC<Props> = ({ betSide, setBetSide }) => {
  return (
    <div className="border-2">
      <div className="flex p-2 bg-secondary-dark justify-center">
        <label>Side</label>
        <div className="border-1 mx-2" />
        <a
          href="#"
          className={`${
            betSide === "White" ? "border-2" : ""
          }  rounded-full w-7 h-7 grid place-content-center mx-1`}
          onClick={() => {
            setBetSide("White")
          }}
        >
          <FaChessKing color="white" className="" />
        </a>
        <a
          href="#"
          className={`${
            betSide === "Black" ? "border-2" : ""
          }  rounded-full w-7 h-7 grid place-content-center mx-1`}
          onClick={() => {
            setBetSide("Black")
          }}
        >
          <FaChessKing color="black" className="" />
        </a>
      </div>
      {/* <div className="border-b-2 border-primary-dark" /> */}
      <div className="flex justify-evenly">{betSide}</div>
    </div>
  )
}
