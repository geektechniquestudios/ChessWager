import { GiChessRook } from "react-icons/gi"
import { Price } from "../../containers/Price"

interface Props {
  potSize: string
  betSide: string
}

export const CenterOfBet: React.FC<Props> = ({ potSize, betSide }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex justify-center align-middle border shrink min-w-max">
      <div className="rounded-full border flex justify-center align-middle relative w-28 bg-secondary-dark">
        <div className="absolute z-0 text-positive top-2 bg-secondary">
          {/* Put a cool bg image here*/}

        </div>
        <div className="absolute z-10 underline decoration-4 font-bold text-primary-dark top-1">
          <p className="px-1">{`$${(Number(potSize) * avaxPrice).toFixed(
            2,
          )}`}</p>
        </div>
        <div className="absolute left-1 top-1">
          <GiChessRook color={betSide} size="1.4rem" />
        </div>
        <div className="absolute right-1 top-1">
          <GiChessRook
            color={betSide === "White" ? "black" : "white"}
            size="1.4rem"
          />
        </div>
      </div>
    </div>
  )
}
