import { GiChessRook } from "react-icons/gi"
import { WindowSize } from "../../../containers/WindowSize"
import { PotSize } from "./PotSize"

interface Props {
  potSize: string
  betSide: string
}

export const CenterOfBet: React.FC<Props> = ({ potSize, betSide }) => {
  const { width } = WindowSize.useContainer()
  return (
    <div className="flex flex-col justify-evenly rounded-sm border-l border-r border-stone-400 bg-stone-200 px-1 dark:border-stone-500 dark:bg-stone-800">
      {width < 1024 ? <PotSize potSize={potSize} /> : <div className="w-2" />}
      <div className="flex justify-between rounded-full align-middle">
        <div
          className={`flex h-8 w-8 justify-center rounded-md border border-stone-700 dark:border-stone-600 ${
            betSide === "white"
              ? "bg-stone-400 dark:bg-stone-900"
              : "border-stone-600 bg-stone-100 dark:bg-stone-500 "
          }`}
        >
          <div className="flex flex-col justify-center">
            <GiChessRook color={betSide} size="17" />
          </div>
        </div>

        {width >= 1024 ? (
          <PotSize potSize={potSize} />
        ) : (
          <div className="w-2" />
        )}

        <div
          className={`flex h-8 w-8 justify-center rounded-md border border-stone-700 dark:border-stone-400 ${
            betSide === "black"
              ? "bg-stone-400 dark:bg-stone-900"
              : "border-stone-600 bg-stone-100 dark:bg-stone-500 "
          }`}
        >
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
