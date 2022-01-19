import { GiChessRook } from "react-icons/gi"
import { Price } from "../../containers/Price"

interface Props {
  potSize: string
  betSide: string
}

export const CenterOfBet: React.FC<Props> = ({ potSize, betSide }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex flex-col justify-center border-2 min-w-max px-1">
      <div className="flex rounded-full border-2 justify-between align-middle bg-secondary">
        <div className="flex rounded-full border-2 p-0.5 justify-center align-middle">
          <GiChessRook color={betSide} size="1.2rem" />
        </div>

        <div className=" z-10 underline decoration-4 font-bold text-primary-dark top-1">
          <p className="px-1">{`$${(Number(potSize) * avaxPrice).toFixed(
            2,
          )}`}</p>
        </div>

        <div className="flex rounded-full border-2 p-0.5 justify-center align-middle">
          <GiChessRook
            color={betSide === "White" ? "black" : "white"}
            size="1.2rem"
          />
        </div>
      </div>
    </div>
  )
}
