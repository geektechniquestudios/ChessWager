import { Countdown } from "./Countdown"

interface Props {
  title: string
  name: string
  time: number
  rating: number
  fen: string
  side: string
}

export const PlayerData: React.FC<Props> = ({
  title,
  name,
  time,
  rating,
  fen,
  side,
}) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <p className="mx-1 font-bold text-teal-700">{title}</p>
          <div className="flex gap-2">
            <p>{name}</p>
            <p className="font-bold">{rating}</p>
          </div>
        </div>
      </div>
      <Countdown fen={fen} side={side} time={time} />
    </div>
  )
}
