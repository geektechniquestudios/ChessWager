import { Bet } from "../../../../../interfaces/Bet"
import { Price } from "../../../../containers/Price"
import { formatDollars } from "../../../../lobby/bet/models/formatDollars"

interface Props {
  bet: Bet
}

export const BetMetadataTile: React.FC<Props> = ({ bet }) => {
  const { amount, createdAt, multiplier } = bet
  const betAmount = amount! + amount! * multiplier!
  const { avaxPrice } = Price.useContainer()
  return (
    <div className="flex w-full flex-col gap-0.5 rounded-md border border-stone-400 bg-white px-2 text-xs dark:border-stone-500 dark:bg-stone-600">
      <div className="flex w-full justify-between">
        <div className="my-2 font-bold">
          <div>USD ${formatDollars(betAmount * avaxPrice)} </div>
          <div>AVAX {formatDollars(betAmount)} </div>
        </div>

        <div className="flex flex-col items-end justify-center">
          <p>
            {new Date(createdAt!.seconds * 1000).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </p>
          <p>
            {new Date(createdAt!.seconds * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZoneName: "short",
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
