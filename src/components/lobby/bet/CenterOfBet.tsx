import { GiChessRook } from "react-icons/gi"
import { Price } from "../../containers/Price"

interface Props {
  potSize: string
  betSide: string
}

export const CenterOfBet: React.FC<Props> = ({ potSize, betSide }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex flex-col justify-center min-w-max px-1 bg-stone-200 dark:bg-stone-700 rounded-sm border-l border-r border-stone-400 dark:border-stone-500">
      <div className="flex rounded-full justify-between align-middle">
      <div className={`flex justify-center rounded-md border-1 border-stone-700 dark:border-stone-400 w-8 h-8 ${betSide === "white" ? "bg-stone-400 dark:bg-stone-900": "bg-stone-300 dark:bg-stone-500 border-stone-600 "}`}>
          <div className="flex flex-col justify-center">
            <GiChessRook color={betSide} size="17" />
          </div>
        </div>

        <div className=" z-10 underline decoration-4 font-bold top-1 text-stone-900 dark:text-stone-300">
          <p className="px-1">{`$${(Number(potSize) * avaxPrice)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
        </div>

        <div className={`flex justify-center rounded-md border-1 border-stone-700 dark:border-stone-400 w-8 h-8 ${betSide === "black" ? "bg-stone-400 dark:bg-stone-900": "bg-stone-300 dark:bg-stone-500 border-stone-600 "}`}>
          <div className="flex flex-col justify-center">
            <GiChessRook
              color={betSide === "white" ? "black" : "white"}
              size="17"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
