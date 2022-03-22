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
      <div className="flex flex-col justify-center overflow-hidden">
        <div className="flex justify-center mx-1.5 ">
          <p className="flex mx-1 font-bold text-teal-700">{title}</p>
          <div className="flex gap-2">
            <p>{name}</p>
            <p className="font-bold">{rating}</p>
          </div>
        </div>
      </div>
      <Countdown fen={fen} side={side} time={time} isNewGame={isNewGame} />
    </div>
  )
}
