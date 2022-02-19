import { GiChessRook } from "react-icons/gi"
import { Price } from "../../containers/Price"
import { PotSize } from "./PotSize"

interface Props {
  potSize: string
  betSide: string
}

export const CenterOfBet: React.FC<Props> = ({ potSize, betSide }) => {
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex flex-col justify-center min-w-max px-1 bg-stone-200 dark:bg-stone-800 rounded-sm border-l border-r border-stone-400 dark:border-stone-500">
      <div className="flex rounded-full justify-between align-middle">
      <div className={`flex justify-center rounded-md border-1 border-stone-700 dark:border-stone-600 w-8 h-8 ${betSide === "white" ? "bg-stone-400 dark:bg-stone-900": "bg-stone-100 dark:bg-stone-500 border-stone-600 "}`}>
          <div className="flex flex-col justify-center">
            <GiChessRook color={betSide} size="17" />
          </div>
        </div>

        <PotSize potSize={potSize} />

        <div className={`flex justify-center rounded-md border-1 border-stone-700 dark:border-stone-400 w-8 h-8 ${betSide === "black" ? "bg-stone-400 dark:bg-stone-900": "bg-stone-100 dark:bg-stone-500 border-stone-600 "}`}>
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
