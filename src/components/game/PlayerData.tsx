import { Countdown } from "./Countdown"

interface Props {
  title: string
  name: string
  time: number
  rating: number
  fen: string
  side: string
  isNewGame: boolean
}

export const PlayerData: React.FC<Props> = ({
  title,
  name,
  time,
  rating,
  fen,
  side,
  isNewGame,
}) => {
  return (
    <div className="flex w-full justify-between overflow-clip">
      <a
        href={`https://lichess.org/@/${name}`}
        rel="noreferrer"
        target="_blank"
        className="flex flex-col justify-center overflow-hidden hover:text-stone-900 dark:hover:text-white "
      >
        <div className="mx-1.5 flex justify-center">
          <p className="mx-1 flex font-bold text-emerald-700 dark:text-emerald-500">{title}</p>
          <div className="flex gap-2 hover:underline">
            <p>{name}</p>
            <p className="font-bold">{rating !== 0 ? rating : ""}</p>
          </div>
        </div>
      </a>
      <Countdown fen={fen} side={side} time={time} isNewGame={isNewGame} />
    </div>
  )
}
