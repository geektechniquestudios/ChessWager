import { GiChessRook } from "react-icons/gi"
import { Price } from "../../containers/Price"

interface Props {
  potSize: string
  betSide: string
}

export const CenterOfBet: React.FC<Props> = ({ potSize, betSide }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex flex-col justify-center min-w-max px-1 bg-stone-300 rounded-sm border-1">
      <div className="flex rounded-full justify-between align-middle">
        <div className="grid place-content-center rounded-full border-1 bg-stone-400 w-8 h-8">
          <GiChessRook color={betSide} size="17" />
        </div>

        <div className=" z-10 underline decoration-4 font-bold text-primary-dark top-1">
          <p className="px-1">{`$${(Number(potSize) * avaxPrice).toFixed(
            2,
          )}`}</p>
        </div>

        <div className="grid place-content-center rounded-full border-1 bg-stone-400 w-8 h-8">
          <GiChessRook
            color={betSide === "white" ? "black" : "white"}
            size="17"
          />
        </div>
      </div>
    </div>
  )
}
